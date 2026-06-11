import re

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    idx = html_content.find("3 Open slots")
    print(f"Match for '3 Open slots' at {idx}:")
    if idx != -1:
        context = html_content[max(0, idx - 1500): idx + 500]
        # Find images in this context
        imgs = re.findall(r'https://framerusercontent\.com/images/[^\s"\')\?]+', context)
        print("Found images nearby:")
        for img in set(imgs):
            print(f"  {img}")
            
if __name__ == '__main__':
    main()
