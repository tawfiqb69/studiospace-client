# StudioSpace 🎨

### Find Your Space. Create Your Story.

StudioSpace is a creative studio booking platform designed to connect creators with inspiring spaces. From photography studios to podcast rooms, users can discover, explore, and book the perfect space for their creative projects.

🌐 **Live Website:** [Visit StudioSpace](https://studiospace-client-beta.vercel.app)

---

## ✨ Key Features

- **Explore Studios:** Discover creative spaces across five categories: Photo Studios, Sound Stages, Podcast Rooms, Music Suites, and Art Workshops.
- **Detailed Studio Profiles:** Explore studio galleries, amenities, pricing, capacity, ratings, and host information.
- **Secure Authentication:** Sign up and log in using email/password or Google authentication.
- **Studio Management:** Create, update, and delete your own studio listings.
- **Flexible Image Galleries:** Showcase studios with multiple images.
- **Studio Booking:** Select dates and time slots with an automatic price calculation.
- **Booking Conflict Prevention:** Prevent overlapping reservations when a booking is already confirmed.
- **Booking Management:** View booking history, check booking statuses, and cancel pending bookings.
- **Personal Dashboard:** Access studio management and booking shortcuts in one place.
- **Light & Dark Mode:** Enjoy a theme that suits your preference.
- **Responsive Experience:** Designed for mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

| Frontend | Backend & Services |
|---|---|
| Next.js 16 | Node.js |
| React | Express.js |
| JavaScript (JSX) | MongoDB |
| Tailwind CSS v4 | MongoDB Atlas |
| Shadcn UI | Better Auth JWT |
| Sonner | Vercel |
| Swiper | Google OAuth |
| next-themes | ImgBB |

## 🚀 Local Setup

### Prerequisites

- Node.js
- npm
- Git
- MongoDB connection

### Installation

**1. Clone the client repository**

```bash
git clone https://github.com/tawfiqb69/studiospace-client.git
```

**2. Navigate to the project directory**

```bash
cd studiospace-client
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**5. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Make sure the StudioSpace Express backend is also running on port `8000`.

## 🔑 Examiner Test Credentials

| Credential | Value |
|---|---|
| Name | Examiner |
| Email | Examiner@gmail.com |
| Password | Examiner@gmail.com |

---

<p align="center">
  <strong>StudioSpace</strong><br/>
  Built with passion for creators and creative spaces.
</p>