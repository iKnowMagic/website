import tailwindTypography from '@tailwindcss/typography'
import rippleui from 'rippleui'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    extend: {
      colors: {
        primary: defaultTheme.colors.green
      }
    }
  },
  plugins: [tailwindTypography, rippleui]
}
