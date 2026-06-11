import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # Search for styles associated with the body tag
    body_styles = re.findall(r'body\s*\{(.*?)\}', html_content, re.DOTALL)
    print("Body styles:")
    for style in body_styles:
        print(style.strip())
        print("-" * 30)
        
    # Search for any styles with gradient mesh or radial gradient
    gradient_styles = re.findall(r'[^}]*gradient[^}]*\}', html_content)
    print("\nGradient styles (first 10):")
    for style in gradient_styles[:10]:
        print(style.strip())
        print("-" * 30)

if __name__ == '__main__':
    main()
