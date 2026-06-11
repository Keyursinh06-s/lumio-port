import re

def main():
    html_content = open('index.html', encoding='utf-8').read()
    
    # Search for all URLs that might contain code (ends with .js, .mjs, or similar)
    urls = re.findall(r'https://framerusercontent\.com/[^\s"\']+\.m?js\b', html_content)
    print("Found framer mjs/js URLs in index.html:")
    for url in set(urls):
        print(f"  {url}")
        
    # Also let's check script_main.js for imports
    try:
        js_content = open('script_main.js', encoding='utf-8').read()
        js_imports = re.findall(r'import\s+.*?\s+from\s*["\'](https://framerusercontent\.com/.*?)["\']', js_content)
        print("\nFound imports in script_main.js:")
        for imp in set(js_imports):
            print(f"  {imp}")
            
        # Also check for dynamic imports: import("...")
        dyn_imports = re.findall(r'import\s*\(\s*["\'](https://framerusercontent\.com/.*?)["\']\s*\)', js_content)
        print("\nFound dynamic imports in script_main.js:")
        for imp in set(dyn_imports):
            print(f"  {imp}")
    except Exception as e:
        print("Error reading script_main.js:", e)

if __name__ == '__main__':
    main()
