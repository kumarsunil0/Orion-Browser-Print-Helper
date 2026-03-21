# Orion Browser Print Helper

A browser extension designed to bypass aggressive popup blocking and "blank window" issues on mobile browsers, specifically optimized for **Orion Browser on iOS**.

## 🚀 Purpose

This extension was created to solve a common issue where tracking labels, invoices, or printouts (like those on **Delhivery One**) fail to open in Orion/Safari on iPhone due to popup blockers or "about:blank" window restrictions.

## ✨ Features

- **Popup Interception**: Automatically catches `window.open` calls and form submissions that would otherwise be blocked.
- **Background Engine (V1.7+)**: Uses a background script to reliably open tabs using the Extension API, bypassing browser-level restrictions.
- **Domain Filtering**: Includes a settings page to specify exactly which websites the extension should be active on.
- **Persistent Logic**: Prevents automated window closes that can interrupt the print flow.

## 🛠️ Installation (Orion Browser on iOS)

1. **Download the Zip**: Download the latest `orion_print_helper_v1.9.zip` from this repository.
2. **Open Orion Settings**: On your iPhone/iPad, open Orion and go to **Settings > Extensions**.
3. **Install from File**:
   - Tap **Install from File**.
   - Select the downloaded `.zip` file.
4. **Configure Domains**:
   - Go to **Settings > Extensions > Orion Print Helper > Extension Settings (Options)**.
   - Add the domain you want to use (e.g., `delhivery.com`).
   - Tap **Add**.
5. **Permissions**: If prompted by Orion to "Always Allow" popups for a site, select **Always Allow**.

## 🧪 Tested On

- **Browser**: Orion Browser (iOS)
- **Website**: [Delhivery One](https://one.delhivery.com) (Order tracking and label printing)

## 📄 Version History

- **v1.9**: Final refinements, improved click interception, and removed debug banners.
- **v1.7**: Integrated Background Script for more reliable tab opening.
- **v1.6**: Added Settings Page for domain management.
- **v1.3**: Initial stable release for HTML print support.

---
*Developed to help logistics and e-commerce users manage their operations smoothly on mobile.*
