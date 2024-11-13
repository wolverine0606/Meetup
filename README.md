# MeetUp App

MeetUp is a React Native mobile application designed to help people discover and create local events, connect with like-minded individuals, and build thriving communities. Whether you're looking to attend exciting gatherings or start your own, MeetUp has got you covered.

## Features

- **Explore Events**: Browse through a list of local events tailored to your interests.
- **Create Your Own Meetups**: Create and manage your own events and gatherings easily.

## Technologies Used

- **React Native**: The core framework for building mobile applications.
- **Expo**: For ease of development, testing, and deployment.

## Prerequisites

To run this project, ensure you have the following installed:

- **Node.js** (v14 or later recommended)
- **Expo CLI**
- **Xcode** (for iOS simulation)
- **Android Studio** (for Android simulation)

## Installation

```bash
git clone https://github.com/yourusername/meetup-app.git
cd Meetup
```

## Install dependencies

```bash
$ npm install
```

## Prebuild the native code

```bash
$ npx expo prebuild --clean
```

## Run on IOS

```bash
$ npx expo run ios
```

## Run on Android

```bash
$ npx expo run android
```

## Running in Development Mode

```bash
$ npx expo start --dev-client
```

## Environment Variables

### **Ensure you have a .env file for these environment-specific variables:**

EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_MAPBOX_TOKEN =
