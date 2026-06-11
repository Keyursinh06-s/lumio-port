import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # We want to extract the exact style block with data-framer-font-css
    font_css_match = re.search(r'<style data-framer-font-css>(.*?)</style>', html_content, re.DOTALL)
    font_css = font_css_match.group(1) if font_css_match else ""
    
    # Let's write src/index.css
    index_css_content = f"""@tailwind base;
@tailwind components;
@tailwind utilities;

/* Typography from Framer Font CSS */
{font_css}

@layer base {{
  body {{
    background-color: #ebeced;
    color: #000000;
    font-family: Geist, Inter, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }}

  ::selection {{
    background-color: #000000;
    color: #ffffff;
  }}
}}

/* Custom utilities */
.backdrop-blur-dock {{
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}}

/* Custom scroll reveal initial states */
.reveal-init {{
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}}

.reveal-active {{
  opacity: 1;
  transform: translateY(0);
}}

/* Infinite marquee styles */
@keyframes marquee {{
  0% {{ transform: translateX(0%); }}
  100% {{ transform: translateX(-50%); }}
}}

.animate-marquee {{
  display: flex;
  width: max-content;
  animation: marquee 40s linear infinite;
}}

.animate-marquee:hover {{
  animation-play-state: paused;
}}
"""
    
    with open('src/index.css', 'w', encoding='utf-8') as f:
        f.write(index_css_content)
    print("src/index.css created successfully!")

if __name__ == '__main__':
    main()
