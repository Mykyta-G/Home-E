# Home-E - A Hackathon Story

<img width="441" height="546" alt="Screenshot 2025-12-21 at 20 45 54" src="https://github.com/user-attachments/assets/5c5861c9-c233-499d-947f-bf9255158752" />

> **Built with sweat, tears, and pure determination during HetchHacks 2025**

A beautiful, customizable family management application built with Vue 3 and Electron. What started as a hackathon project is now on a journey to become a full-fledged mobile and desktop application.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-39-47848F?style=flat&logo=electron&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-7-119EFF?style=flat&logo=capacitor&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat)

---

## The Story

### The Hackathon Journey

In the heat of HetchHacks 2025, we set out to build something meaningful—a family hub that could bring families closer together through shared organization and communication.

**The Challenge:** Build a complete family management application from scratch.

**The Stack:** Vue 3 + Electron + Vite + LocalStorage

**The Result:** A fully functional desktop app with customizable widgets, shopping lists, meal planning, activity tracking, and more—all built with modern web technologies and packaged as a native desktop application.

### The Vision

This hackathon project is just the beginning. Our goal is to evolve Family Hub into a production-ready application that can run on:
- **iOS & Android** (via Capacitor)
- **Windows, macOS & Linux** (via Electron)
- **Web** (as a PWA)

We're documenting our journey, learning from our mistakes, and building something that families will actually want to use.

---

## Features

### Dashboard
- **Customizable Widget System** - Drag-and-drop widgets with smart layout optimization
- **Multiple Widget Types** - Shopping lists, meal countdowns, todo lists, activity trackers
- **Responsive Grid Layout** - Automatically optimizes widget placement
- **Resizable Widgets** - Full-width or half-width widgets that adapt to your needs

### Shopping List
- **Grouped Items** - Organize by category or store
- **Family Collaboration** - Share lists with family members
- **Quick Add** - Fast item entry with smart suggestions

### Meal Countdown
- **Visual Timers** - Beautiful countdown displays for meal times
- **Customizable Schedules** - Set meal times for your family
- **Notifications** - Never miss a meal again

### Todo List
- **Task Management** - Organize family tasks and chores
- **Priority Levels** - Mark important tasks
- **Progress Tracking** - See what's done and what's pending

### Activity Tracker
- **Family Activities** - Track shared activities and events
- **Visual Progress** - See activity patterns over time
- **Member Assignments** - Assign activities to family members

### Profile & Settings
- **Family Members** - Manage family member profiles
- **Role Management** - Admin and member roles
- **Theme Customization** - Choose from multiple beautiful themes:
  - Default (Fresh Sky)
  - Dark Mode
  - Ocean
  - Sunset

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Mykyta-G/Hackaton-HetchHacks.git
cd Hackaton-HetchHacks

# Install dependencies
npm install
```

### Development

```bash
# Start development server (Vue + Electron)
npm run dev
```

This will:
- Start the Vite dev server on `http://localhost:5173`
- Launch Electron with hot-reload enabled
- Watch for file changes automatically

### Building

```bash
# Build for production
npm run build

# Start production build
npm start
```

---

## Mobile Development

Home-E uses **Capacitor** to build native iOS and Android apps from the same Vue codebase.

### What is Capacitor?

Capacitor is a cross-platform app runtime that lets you build native mobile apps using web technologies (HTML, CSS, JavaScript). Think of it as the mobile equivalent of Electron for desktop.

**How it works:**
1. Your Vue app runs in a native WebView (not a browser)
2. Capacitor provides a bridge between JavaScript and native code
3. You can access native device features (camera, GPS, notifications) from JavaScript
4. One codebase → multiple platforms (iOS, Android, Web)

**Architecture:**
```
Vue 3 App (src/)
    ↓
Vite Build (dist/)
    ↓
Capacitor Sync
    ↓
Native Apps (ios/ & android/)
```

### Prerequisites

**For iOS Development:**
- macOS with Xcode installed
- CocoaPods: `brew install cocoapods` or `sudo gem install cocoapods`

**For Android Development:**
- Android Studio installed
- Java Development Kit (JDK)

### Initial Setup

Capacitor is already initialized in this project. If you're setting up a fresh clone:

```bash
# Install Capacitor dependencies (already done)
npm install

# Add mobile platforms
npx cap add ios
npx cap add android

# Build your Vue app
npm run build

# Sync with native platforms
npx cap sync
```

### iOS Development

```bash
# Build your app
npm run build

# Sync with iOS
npx cap sync

# Install iOS dependencies
cd ios/App
pod install
cd ../..

# Open in Xcode
npx cap open ios
```

In Xcode:
- Select a simulator or connected device
- Click the Run button to build and run

### Android Development

```bash
# Build your app
npm run build

# Sync with Android
npx cap sync

# Open in Android Studio
npx cap open android
```

In Android Studio:
- Select an emulator or connected device
- Click Run to build and run

### Development Workflow

The typical workflow when developing mobile features:

1. **Make changes** to your Vue app in `src/`
2. **Build** the web app: `npm run build`
   - This compiles your Vue app into the `dist/` folder
3. **Sync** with native platforms: `npx cap sync`
   - Copies `dist/` to iOS and Android projects
   - Updates native dependencies
   - Syncs configuration changes
4. **Test** in Xcode/Android Studio or on a real device

**Quick workflow:**
```bash
# After making changes to your Vue app
npm run build && npx cap sync
```

**Note:** For iOS, after syncing, you may need to run `pod install` in `ios/App/` if native dependencies changed.

### Common Capacitor Commands

| Command | What it does |
|---------|-------------|
| `npx cap add ios` | Adds iOS platform to your project |
| `npx cap add android` | Adds Android platform to your project |
| `npx cap sync` | Syncs your web app to native platforms |
| `npx cap copy` | Copies web assets only (faster than sync) |
| `npx cap update` | Updates Capacitor and native dependencies |
| `npx cap open ios` | Opens iOS project in Xcode |
| `npx cap open android` | Opens Android project in Android Studio |
| `npx cap run ios` | Builds and runs iOS app (requires Xcode) |
| `npx cap run android` | Builds and runs Android app (requires Android Studio) |

### Understanding the Sync Process

When you run `npx cap sync`, Capacitor:

1. **Copies** your built web app (`dist/`) to:
   - `ios/App/App/public/` (iOS)
   - `android/app/src/main/assets/public/` (Android)

2. **Updates** native dependencies and plugins

3. **Syncs** configuration from `capacitor.config.json`

4. **Generates** native project files if needed

**Important:** Always run `npm run build` before `npx cap sync` to ensure your latest changes are included!

### Configuration

Mobile app configuration is in `capacitor.config.json`:

```json
{
  "appId": "com.homeeapp",
  "appName": "home-e",
  "webDir": "dist"
}
```

- **appId:** Unique identifier for your app (Bundle ID on iOS, Package Name on Android)
- **appName:** Display name shown on device home screen
- **webDir:** Directory containing your built web app (output of `npm run build`)

### Using Native Features

Capacitor allows you to access native device features. Example:

```javascript
// In your Vue component
import { Camera } from '@capacitor/camera';

// Take a photo
const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: 'base64'
  });
  // Use the image in your app
};
```

**Popular Capacitor plugins:**
- `@capacitor/camera` - Camera access
- `@capacitor/geolocation` - GPS location
- `@capacitor/push-notifications` - Push notifications
- `@capacitor/storage` - Native storage (alternative to LocalStorage)
- `@capacitor/filesystem` - File system access

### Troubleshooting

**iOS:**
- **"CocoaPods not found"**: Install with `brew install cocoapods`
- **"Pod install failed"**: Run `cd ios/App && pod install` manually
- **Xcode errors**: Make sure Xcode is up to date and you've accepted the license

**Android:**
- **"Android SDK not found"**: Install Android Studio and SDK
- **Build errors**: Check that `android/app/build.gradle` has correct configurations

**General:**
- **Changes not appearing**: Make sure you ran `npm run build` before `npx cap sync`
- **Sync is slow**: Use `npx cap copy` for faster web asset updates (skips dependency updates)

### Testing on Physical Devices (Wireless)

You can test your app on your phone wirelessly without a USB cable!

#### iOS Wireless Testing

**Method 1: Xcode Wireless Debugging**
1. Connect your iPhone to your Mac via USB **once** (first time only)
2. Open Xcode → **Window** → **Devices and Simulators**
3. Select your device and check **"Connect via network"**
4. Disconnect the USB cable
5. Your device will now appear as "Connected via network"
6. Build and run from Xcode - it will install wirelessly!

**Method 2: Capacitor Live Reload (Recommended)**
```bash
# Terminal 1: Start your dev server (accessible on network)
npm run dev -- --host

# Terminal 2: Sync and run with live reload
npx cap sync
npx cap run ios -- --livereload --external
```

This enables:
- Wireless installation on your iPhone
- Live reload when you make changes
- No USB cable needed after initial setup

#### Android Wireless Testing

**Method 1: ADB Wireless Debugging (Android 11+)**
1. Enable **Developer Options** on your Android phone
2. Enable **Wireless debugging** in Developer Options
3. Note the IP address and port shown
4. Pair your device:
   ```bash
   # Pair (use the pairing code from your phone)
   adb pair <IP>:<PORT>
   
   # Connect (use the IP:PORT shown after pairing)
   adb connect <IP>:<PORT>
   
   # Verify connection
   adb devices
   ```
5. Now you can build and run wirelessly!

**Method 2: Capacitor Live Reload**
```bash
# Terminal 1: Start dev server
npm run dev -- --host

# Terminal 2: Run with live reload
npx cap sync
npx cap run android -- --livereload --external
```

#### Live Reload Setup

For the best development experience with wireless testing:

```bash
# 1. Make sure both devices are on the same Wi-Fi network
# 2. Start dev server with network access
npm run dev -- --host

# 3. Sync and run with live reload
npx cap sync
npx cap run ios -- --livereload --external
# or for Android:
npx cap run android -- --livereload --external
```

**Benefits:**
- Automatic reload when you save changes
- Test on real device without USB
- Faster development cycle
- Works over your local Wi-Fi network

**Important Notes:**
- Both your computer and phone must be on the **same Wi-Fi network**
- For iOS: First connection requires USB, then it's wireless
- For Android: Requires Android 11+ for wireless debugging, or use USB debugging first
- Make sure your firewall allows connections on the dev server port

---

## Project Structure

```
Hackaton-HetchHacks/
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── widgets/         # Dashboard widgets
│   │   └── ShoppingList/    # Shopping list components
│   ├── views/               # Main application views
│   ├── stores/              # State management (reactive stores)
│   ├── utils/               # Utility functions
│   └── App.vue             # Root component
├── android/                 # Android native project
├── ios/                     # iOS native project
├── assets/                  # Static assets
├── dist/                    # Built web app (for Capacitor)
├── capacitor.config.json    # Capacitor configuration
├── main.js                  # Electron main process
├── preload.js              # Electron preload script
└── vite.config.js          # Vite configuration
```

---

## Tech Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **Desktop Framework:** Electron 39
- **Mobile Framework:** Capacitor 7
- **Build Tool:** Vite 7
- **State Management:** Vue Reactive Stores
- **Storage:** LocalStorage (persistent state)
- **Styling:** CSS Custom Properties (theming)

---

## Design Philosophy

Family Hub was designed with these principles in mind:

1. **Simplicity First** - Clean, intuitive interfaces that anyone can use
2. **Customization** - Every family is different; the app adapts to you
3. **Performance** - Fast, responsive, and lightweight
4. **Beauty** - Modern UI with beautiful themes and smooth animations

---

## Roadmap

### Phase 1: Hackathon MVP 
- [x] Desktop app with Electron
- [x] Dashboard with widgets
- [x] Core features (Shopping, Meals, Todos, Activities)
- [x] Theme system
- [x] LocalStorage persistence

### Phase 2: Mobile Port (In Progress) 
- [x] Capacitor integration
- [x] iOS app build
- [x] Android app build
- [ ] Mobile-optimized UI
- [ ] Touch gestures

### Phase 3: Backend & Sync (Planned) 
- [ ] Cloud sync
- [ ] Real-time collaboration
- [ ] User authentication
- [ ] Multi-device support

### Phase 4: Production Ready (Future)
- [ ] App store submissions
- [ ] Performance optimization
- [ ] Comprehensive testing
- [ ] Documentation
- [ ] Community features

---

## Contributing

This project started as a hackathon project, but we're open to contributions! Whether you're fixing bugs, adding features, or improving documentation, your help is welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **HetchHacks 2024** - For the amazing hackathon experience

---

## Contact

Have questions, suggestions, or just want to say hi? Open an issue or reach out!

---

**Built with love during HetchHacks 2025**

*From hackathon prototype to production app—one commit at a time.*
