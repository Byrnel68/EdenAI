# Contributing Guide

## Setup Instructions for Team Members

### First Time Setup

1. **Clone the repository**
   ```bash
   git clone https://gitlab.scss.tcd.ie/byrnel68/edenai.git
   cd edenai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   This may take a few minutes. It installs all the required packages.

3. **Verify installation**
   ```bash
   npm run dev
   ```
   
   If you see "Ready in X.Xs" and "Local: http://localhost:3000", you're all set!

4. **Open in browser**
   
   Navigate to http://localhost:3000

### Daily Development Workflow

1. **Pull latest changes**
   ```bash
   git pull origin main
   npm install  # In case dependencies changed
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b your-name/what-youre-working-on
   # Example: git checkout -b laurie/add-new-chart
   ```

3. **Make your changes**
   - Edit files in your editor
   - The dev server auto-reloads on save
   - Check http://localhost:3000 to see changes

4. **Test your changes**
   - Make sure the page loads without errors
   - Test any interactive features you changed
   - Check the browser console for errors (F12)

5. **Commit and push**
   ```bash
   git add .
   git commit -m "Brief description of what you changed"
   git push origin your-name/what-youre-working-on
   ```

6. **Create a Merge Request**
   - Go to https://gitlab.scss.tcd.ie/byrnel68/edenai
   - Click "Merge Requests" → "New merge request"
   - Select your branch
   - Add a description of your changes
   - Assign reviewers (optional)
   - Submit!

## Common Tasks

### Adding a New Component

1. Create your component file in `components/` or directly in the main component file
2. Import and use it in `eden_ai_interactive_one_pager_poster_sourced.tsx`
3. Test it locally

### Styling Changes

- Styles use Tailwind CSS classes
- Main component: `eden_ai_interactive_one_pager_poster_sourced.tsx`
- Global styles: `app/globals.css`

### Updating Dependencies

If you need to add a new package:
```bash
npm install package-name
```

Then commit the updated `package.json` and `package-lock.json`

## Troubleshooting

### Port 3000 already in use

If you get an error that port 3000 is busy:
```bash
# Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill

# Or use a different port:
PORT=3001 npm run dev
```

### npm install fails

Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Changes not showing

1. Hard refresh browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Check terminal for compilation errors
3. Restart dev server: `Ctrl+C` then `npm run dev`

### Git issues

If you have merge conflicts:
```bash
git pull origin main
# Resolve conflicts in files
git add .
git commit -m "Resolve merge conflicts"
```

## Code Style

- Use TypeScript where possible
- Follow existing code formatting
- Use meaningful variable names
- Add comments for complex logic
- Keep components focused and small

## Need Help?

- Check the README.md
- Look at existing code for examples
- Ask in your team chat/group

