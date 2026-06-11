import re

def main():
    html_content = open('index.html', encoding='utf-8').read()
    
    # Use regex to find <script>...</script>
    scripts = re.findall(r'<script\b[^>]*>(.*?)</script>', html_content, re.DOTALL)
    print(f"Found {len(scripts)} inline script tags.")
    for i, content in enumerate(scripts):
        print(f"Script {i}: length={len(content)}")
        if "Enterprise" in content:
            print(f"  -> Contains 'Enterprise'! First 500 chars:")
            print(content[:500])
            print("-" * 50)
            
    # Also find all <script src="..."></script>
    src_scripts = re.findall(r'<script\b[^>]*src="([^"]+)"', html_content)
    print(f"Found {len(src_scripts)} external script tags:")
    for src in src_scripts:
        print(f"  src={src}")
        
    matches = [m.start() for m in re.finditer('Enterprise', html_content)]
    print(f"All occurrences of 'Enterprise' in HTML: {matches}")
    for m in matches:
        print(f"Context at {m}:")
        print(html_content[max(0, m-200): m+200])
        print("="*40)
        
if __name__ == '__main__':
    main()
