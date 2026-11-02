"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { privateFetch } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const amenityOptions = [
  "Wi-Fi",
  "Air conditioning",
  "Studio lights",
  "Backdrops",
  "Soundproofing",
  "Parking",
  "Makeup station",
  "Restroom",
  "Mixer",
  "Microphones",
  "Drum kit",
  "Green screen",
];

const fieldClass =
  "w-full rounded-lg border border-input bg-background dark:bg-input/30 px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30";

export default function StudioForm({ mode = "add", studio }) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: studio?.title ?? "",
    category: studio?.category ?? "",
    hourlyRate: studio?.hourlyRate ?? "",
    securityDeposit: studio?.securityDeposit ?? "",
    maxCapacity: studio?.maxCapacity ?? "",
    location: studio?.location ?? "",
    image: studio?.image ?? "",
    gallery: studio?.gallery?.filter((url) => url !== studio?.image) ?? [],
    amenities: studio?.amenities ?? [],
    overview: studio?.overview ?? "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const addGalleryImage = () => {
    setValues((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ""],
    }));
  };

  const removeGalleryImage = (index) => {
    setValues((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const toggleAmenity = (amenity) => {
    const selected = values.amenities.includes(amenity)
      ? values.amenities.filter((item) => item !== amenity)
      : [...values.amenities, amenity];
    setValues({ ...values, amenities: selected });
  };

  const validate = () => {
    if (!values.title.trim()) return "Please enter a studio title";
    if (!values.category) return "Please choose a category";
    if (!(Number(values.hourlyRate) > 0))
      return "Hourly rate must be more than 0";
    if (values.securityDeposit === "" || Number(values.securityDeposit) < 0)
      return "Please enter a security deposit (0 or more)";
    if (!(Number(values.maxCapacity) >= 1))
      return "Max capacity must be at least 1";
    if (!values.location.trim()) return "Please enter the studio address";
    if (!/^https?:\/\//i.test(values.image.trim()))
      return "Image URL must start with http:// or https://";
    if (!values.overview.trim()) return "Please add a detailed overview";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    // Host name/email pathai na, server token theke nibe
    const body = {
      title: values.title.trim(),
      category: values.category,
      hourlyRate: Number(values.hourlyRate),
      securityDeposit: Number(values.securityDeposit),
      maxCapacity: Number(values.maxCapacity),
      location: values.location.trim(),
      image: values.image.trim(),
      gallery: [
        values.image.trim(),
        ...values.gallery.map((url) => url.trim()).filter(Boolean),
      ],
      amenities: values.amenities,
      overview: values.overview.trim(),
    };

    setLoading(true);
    const { ok, data } = await privateFetch(
      isEdit ? `/api/studios/${studio._id}` : "/api/studios",
      { method: isEdit ? "PUT" : "POST", body: JSON.stringify(body) },
    );
    setLoading(false);

    if (!ok) {
      toast.error(data?.message || "Something went wrong. Please try again.");
      return;
    }

    toast.success(isEdit ? "Studio updated" : "Studio added");
    router.push("/my-listings");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      {/* Basics */}
      <section className="space-y-5">
        <h2 className="font-heading text-lg font-semibold">The basics</h2>

        <div className="space-y-2">
          <Label htmlFor="title">Studio title</Label>
          <Input
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Golden Hour Photo Studio"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              className={`${fieldClass} h-10`}
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location / address</Label>
            <Input
              id="location"
              name="location"
              value={values.location}
              onChange={handleChange}
              placeholder="Banani, Dhaka"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-5">
        <h2 className="font-heading text-lg font-semibold">
          Price and capacity
        </h2>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Hourly rate (৳)</Label>
            <Input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              min="1"
              value={values.hourlyRate}
              onChange={handleChange}
              placeholder="1500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="securityDeposit">Security deposit (৳)</Label>
            <Input
              id="securityDeposit"
              name="securityDeposit"
              type="number"
              min="0"
              value={values.securityDeposit}
              onChange={handleChange}
              placeholder="5000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxCapacity">Max capacity (people)</Label>
            <Input
              id="maxCapacity"
              name="maxCapacity"
              type="number"
              min="1"
              value={values.maxCapacity}
              onChange={handleChange}
              placeholder="8"
            />
          </div>
        </div>
      </section>

      {/* Photo */}
      <section className="space-y-5">
        <h2 className="font-heading text-lg font-semibold">Photos</h2>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="image">Main Image URL</Label>

            <div className="flex items-center gap-2">
              <Input
                id="image"
                name="image"
                type="url"
                value={values.image}
                onChange={handleChange}
                placeholder="https://i.ibb.co/your-image.jpg"
              />

              <Button
                type="button"
                size="icon"
                onClick={addGalleryImage}
                aria-label="Add another image"
              >
                +
              </Button>
            </div>
          </div>

          {values.gallery.map((url, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`gallery-${index}`}>
                Additional Image {index + 1}
              </Label>

              <div className="flex items-center gap-2">
                <Input
                  id={`gallery-${index}`}
                  type="url"
                  value={url}
                  onChange={(e) => {
                    const updatedGallery = [...values.gallery];
                    updatedGallery[index] = e.target.value;

                    setValues((prev) => ({
                      ...prev,
                      gallery: updatedGallery,
                    }));
                  }}
                  placeholder="https://i.ibb.co/your-image.jpg"
                />

                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => removeGalleryImage(index)}
                  aria-label="Remove image"
                >
                  −
                </Button>
              </div>
            </div>
          ))}

          <p className="text-xs text-muted-foreground">
            Upload your photos to imgbb and paste their direct URLs here.
          </p>
        </div>
      </section>

      {/* Amenities */}
      <section className="space-y-5">
        <h2 className="font-heading text-lg font-semibold">Amenities</h2>

        <div className="flex flex-wrap gap-2">
          {amenityOptions.map((amenity) => (
            <label key={amenity} className="cursor-pointer">
              <input
                type="checkbox"
                checked={values.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-input px-4 py-2 text-sm transition-colors hover:bg-accent peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="space-y-5">
        <h2 className="font-heading text-lg font-semibold">About the space</h2>

        <div className="space-y-2">
          <Label htmlFor="overview">Detailed overview</Label>
          <textarea
            id="overview"
            name="overview"
            rows={6}
            value={values.overview}
            onChange={handleChange}
            placeholder="Describe the size, lighting, equipment and what kind of shoots or sessions it suits."
            className={`${fieldClass} py-2.5`}
          />
        </div>
      </section>

      {/* Host (read only) */}
      <section className="space-y-5">
        <h2 className="font-heading text-lg font-semibold">Host</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="hostName">Host name</Label>
            <Input
              id="hostName"
              value={user?.name ?? ""}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hostEmail">Host email</Label>
            <Input
              id="hostEmail"
              value={user?.email ?? ""}
              readOnly
              className="bg-muted"
            />
          </div>
        </div>
      </section>

      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full text-base sm:w-auto sm:px-8"
      >
        {loading
          ? isEdit
            ? "Saving..."
            : "Adding studio..."
          : isEdit
            ? "Save changes"
            : "Add studio"}
      </Button>
    </form>
  );
}
