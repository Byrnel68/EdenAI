# Deploying to Render

This guide will help you deploy the Eden AI Interactive Poster to Render.

## Quick Deploy (Recommended: Static Site)

Since this project uses Next.js static export, deploying as a **Static Site** is the best option (it's free and fast).

### Steps:

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Make sure you're logged in

2. **Create New Static Site**
   - Click **"New +"** → **"Static Site"**
   - Or go to: https://dashboard.render.com/new/static

3. **Connect Repository**
   - Choose **GitLab** as your Git provider
   - Authorize Render to access your GitLab account if needed
   - Select your repository: `byrnel68/edenai`
   - Or use the Git repository URL: `https://gitlab.scss.tcd.ie/byrnel68/edenai.git`

4. **Configure Build Settings**
   - **Name**: `eden-ai-poster` (or any name you prefer)
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `out`
   - **Node Version**: `18` (or leave default)

5. **Deploy**
   - Click **"Create Static Site"**
   - Render will automatically build and deploy your site
   - Your site will be available at: `https://eden-ai-poster.onrender.com` (or your custom domain)

## Alternative: Web Service (Not Recommended)

If you need a web service instead of static site:

1. Go to **"New +"** → **"Web Service"**
2. Connect your GitLab repository
3. Use these settings:
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
   - **Node Version**: `18`

**Note**: Web service requires a paid plan, while static sites are free.

## Environment Variables

No environment variables are needed for this project.

## Custom Domain (Optional)

1. Go to your service in Render dashboard
2. Click **"Settings"** → **"Custom Domains"**
3. Add your custom domain

## Automatic Deploys

Render automatically deploys when you push to your `main` branch. You can:
- Enable/disable auto-deploy in **Settings**
- Manually trigger deployments from the dashboard
- View deployment logs in the **Logs** tab

## Troubleshooting

- **Build fails**: Check the build logs in Render dashboard
- **Site not loading**: Verify `Publish Directory` is set to `out`
- **404 errors**: Make sure Next.js static export is configured correctly in `next.config.js`

