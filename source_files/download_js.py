import urllib.request
import re

def main():
    url = "https://framerusercontent.com/sites/45PpnqmiabIc74iiRhmmhl/script_main.CFagkPS7.mjs"
    print("Downloading external JS file...")
    try:
        response = urllib.request.urlopen(url)
        js_content = response.read().decode('utf-8')
        print(f"Downloaded {len(js_content)} bytes.")
        
        # Let's search for "Enterprise" in the JS file
        matches = [m.start() for m in re.finditer('Enterprise', js_content)]
        print(f"Found {len(matches)} occurrences of 'Enterprise' in JS file:")
        for m in matches:
            print(f"  Context around index {m}:")
            print(js_content[max(0, m-200): m+400])
            print("-" * 50)
            
        # Let's write the file locally so we can inspect it further
        with open('script_main.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        print("Saved JS file as script_main.js")
            
    except Exception as e:
        print("Error downloading JS:", e)

if __name__ == '__main__':
    main()
