import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # Extract style tags content
    styles = re.findall(r'<style\b[^>]*>(.*?)</style>', html_content, re.DOTALL)
    print(f"Found {len(styles)} style tags.")
    
    css_vars = {}
    for css in styles:
        # Find all var definitions like --name: value
        matches = re.finditer(r'(--[a-zA-Z0-9_-]+)\s*:\s*([^;}]+)', css)
        for m in matches:
            var_name, var_val = m.groups()
            css_vars[var_name] = var_val.strip()
            
    print(f"\nExtracted {len(css_vars)} CSS custom properties:")
    for k, v in sorted(css_vars.items()):
        print(f"  {k}: {v}")

if __name__ == '__main__':
    main()
