# PhotoBox

A web app designed for a photo box to capture, print, and share pictures.

## Features

- **Live Camera Feed**: Full-screen video feed from your device's camera
- **Photo Capture**: Press 'p' to take a photo with a 5-second countdown
- **Automatic Storage**: Photos are saved with random filenames in the public directory
- **Automatic Printing**: Photos are automatically printed via CUPS after capture
- **QR Code Access**: Scan QR codes to access saved photos on mobile devices
- **Photo Viewing Page**: Dedicated page for viewing each photo
- **Download Option**: Download photos directly to your device's photo gallery

## How to Use

1. **Access the App**: Open the application in a web browser
2. **Allow Camera Access**: Grant permission when prompted to access your camera
3. **Take Photos**: Press the 'p' key to start a 5-second countdown and capture a photo
4. **View Results**: After capturing, a QR code will be displayed that links to your photo
5. **Access Photo**: Scan the QR code to open the photo viewing page
6. **Download Photo**: On the photo viewing page, click the "Download Photo" button to save the image to your device
7. **Continue**: Press the 'Continue' button or press 'p' again to return to the camera feed

## Technical Details

- Built with Nuxt.js and Vue 3
- Uses the MediaDevices API for camera access
- Photos are stored in the `/public/photos` directory with random filenames
- Automatic printing via custom CUPS (Common Unix Printing System) API implementation
- QR codes generated using qrcode.vue library
- Dedicated photo viewing page at `/photos/[id]` route
- Download functionality using HTML5 download attribute
- Responsive design works on various screen sizes

## Configuration

To enable the printing functionality, you need cups installed locally and set up the following environment variables in
a `.env` file:

```
CUPS_PRINTER_NAME=printer_name    # Name of the printer to use
```

A template `.env.example` file is provided for reference.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
