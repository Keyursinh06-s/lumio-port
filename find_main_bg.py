import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # We want to search for CSS rules that apply to the background of main layout containers
    # For example, look for background, background-image, or linear-gradient
    # Let's find all occurrences of "background" in the stylesheet tags.
    styles = re.findall(r'<style\b[^>]*>(.*?)</style>', html_content, re.DOTALL)
    
    bg_rules = []
    for css in styles:
        # Find all rules that define background styles
        rules = re.findall(r'([\.#a-zA-Z0-9_-]+)\s*\{([^}]*background[^}]*)\}', css)
        for r in rules:
            bg_rules.append(r)
            
    print(f"Found {len(bg_rules)} background rules:")
    for selector, rule in bg_rules:
        # Let's filter out simple transparent or solid white backgrounds
        if 'rgba' in rule or 'gradient' in rule or 'url' in rule or '--token' in rule:
            # clean whitespace
            clean_rule = re.sub(r'\s+', ' ', rule).strip()
            print(f"  Selector: {selector} -> {clean_rule}")

if __name__ == '__main__':
    main()
