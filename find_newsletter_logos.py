import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # Let's search for "Unlock top-tier"
    idx = html_content.find("Unlock top-tier")
    print(f"Match for 'Unlock top-tier' at {idx}:")
    if idx != -1:
        context = html_content[max(0, idx - 1000): idx + 2000]
        # Search for all image src URLs
        imgs = re.findall(r'https://framerusercontent\.com/images/[^\s"\')\?]+', context)
        print("Found images nearby:")
        for img in set(imgs):
            print(f"  {img}")
            
if __name__ == '__main__':
    main()
