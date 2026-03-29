# Ahaaq Auto Exchange - Social Media Connection Guide

This guide explains exactly how to get the necessary API keys and tokens to connect your Facebook, Instagram, and TikTok accounts to your Admin Command Center.

**Important:** Your system is already 100% built and ready. It just needs "permission" to post on your behalf. These steps grant that permission securely.

---

## 📱 Tab 1: Facebook Setup (Meta for Developers)

To post to Facebook, you need a Meta Developer App, a Page ID, and a Page Access Token.

### Step 1: Create a Meta App
1. Go to [Meta for Developers](https://developers.facebook.com/) and log in with your personal Facebook account that manages the Dealership Page.
2. Click **My Apps** (top right) -> **Create App**.
3. Select **Other** -> **Next**.
4. Select **Business** -> **Next**.
5. App Name: `Ahaaq Auto Command Center` (or anything you like).
6. Connect it to your Dealership's Business Account if prompted, then click **Create App**.

### Step 2: Get Page ID and Access Token
1. In your new App dashboard, scroll down to **Add products to your app** and set up **Facebook Login for Business**.
2. Go to **Tools** (in the top nav) -> **Graph API Explorer** (or go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)).
3. In the right sidebar under "Meta App", select your `Ahaaq Auto Command Center` app.
4. Under "User or Page", select **Get Page Access Token**. (A popup will appear asking for permissions; continue and select your dealership page).
5. **Permissions to add:** Click the "Permissions" dropdown and ensure the following are added:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `pages_manage_metadata`
   - `instagram_basic`
   - `instagram_content_publish`
6. Click **Generate Access Token** again to apply these new permissions. Accept the permissions popup.
7. **Copy this short-lived access token.**

### Step 3: Make the Token Long-Lived (IMPORTANT)
The token you just generated expires in an hour. Let's make it permanent:
1. Go to the [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/).
2. Paste your token and click **Debug**.
3. Scroll to the bottom and click **Extend Access Token**.
4. Enter your Facebook password if prompted.
5. **Copy the new Long-Lived Token.** This is your `FB_PAGE_ACCESS_TOKEN`.
6. Also note the `Profile ID` listed on this page—this is your `FB_PAGE_ID`.

### Setup in your Command Center:
- Go to your website's **Command Center -> Settings tab**.
- Paste the `FB_PAGE_ID` and the Long-Lived `FB_PAGE_ACCESS_TOKEN`.

---

## 📸 Tab 2: Instagram Setup

Since Instagram is owned by Meta, it uses the exact same App and Token you just created for Facebook! You just need your specific Instagram User ID.

### Prerequisite:
Ensure your Instagram account is a **Professional/Business Account** and it is linked to your Facebook Business Page. (You can do this in the Instagram app settings: "Account -> Linked Accounts").

### Step 1: Get your Instagram User ID
1. Go back to the [Graph API Explorer](https://developers.facebook.com/tools/explorer/).
2. Paste your Long-Lived Facebook Page Access Token into the "Access Token" box at the top.
3. In the request URL bar (next to the GET button), type: `me?fields=instagram_business_account`
4. Click **Submit**.
5. The JSON output below will look something like this:
   ```json
   {
     "instagram_business_account": {
       "id": "1784141234567890"
     },
     "id": "your-facebook-page-id"
   }
   ```
6. **Copy that ID** (the long number under `instagram_business_account`). This is your `IG_USER_ID`.

### Setup in your Command Center:
- Go to your website's **Command Center -> Settings tab**.
- Paste your `IG_USER_ID`.
- For the `IG_ACCESS_TOKEN`, **paste the EXACT SAME long-lived token** you used for Facebook.

---

## 🎵 Tab 3: TikTok Setup

TikTok requires a separate setup on their Developer portal for the "Content Posting API".

### Step 1: Register as a Developer
1. Go to [TikTok for Developers](https://developers.tiktok.com/) and log in with your dealership's TikTok account.
2. Click **Manage Apps** -> **Create App**.
3. Fill in the basic info (App Name: Ahaaq Auto Publisher, add your website URL).
4. For Products, select **Content Posting API**.
5. Submit the app for approval (TikTok usually approves this instantly or within 24 hours).

### Step 2: Get your Keys and Tokens
1. Once your app is approved, you will see a `Client Key` and `Client Secret`.
2. To get your final `Access Token`, you'll need to authorize your own account via OAuth. TikTok has a quick tool for this in their portal under "Integration" or "Test Users".
3. Authorize your account, and it will output an `Access Token` and a `Refresh Token`. (Your Next.js system is configured to handle the refresh automatically if a refresh URL is provided).

### Setup in your Command Center:
- Go to your website's **Command Center -> Settings tab**.
- Paste the `TIKTOK_ACCESS_TOKEN`, `TIKTOK_CLIENT_KEY`, and `TIKTOK_CLIENT_SECRET`.

---

## 🚀 Finalizing Your System

1. **Enter all variables** securely into the **Settings** tab in your admin Command Center at `http://localhost:3002/admin`.
2. Click **Save Tokens** to store them encrypted in Supabase.
3. Your database script (`pg_cron`) automatically runs every night to prevent tokens from expiring.
4. From now on, whenever you add a "New" vehicle, or mark one as "Sold" or "Price Drop", it will automatically fire to all three connected platforms!
5. You can also manually compose posts from the **Compose Post** tab.

**You now have a fully functional, $0/month automated social media distribution system!**
