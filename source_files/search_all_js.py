import urllib.request
import re
import os

def download_and_search(url):
    print(f"Downloading {url}...")
    try:
        response = urllib.request.urlopen(url)
        content = response.read().decode('utf-8')
        print(f"  Downloaded {len(content)} bytes.")
        
        matches = [m.start() for m in re.finditer('Enterprise', content)]
        if matches:
            print(f"  -> FOUND {len(matches)} occurrences of 'Enterprise'!")
            for m in matches[:3]:
                print(f"    Context: {content[max(0, m-100): m+200]}")
                print("    " + "-"*40)
        
        # Save file to a folder called mjs_files
        if not os.path.exists('mjs_files'):
            os.makedirs('mjs_files')
        filename = url.split('/')[-1]
        with open(os.path.join('mjs_files', filename), 'w', encoding='utf-8') as f:
            f.write(content)
            
        # Check if there are other import statements in this file and return them
        imports = re.findall(r'import\s+.*?\s+from\s*["\'](https://framerusercontent\.com/.*?)["\']', content)
        dyn_imports = re.findall(r'import\s*\(\s*["\'](https://framerusercontent\.com/.*?)["\']\s*\)', content)
        return set(imports + dyn_imports)
    except Exception as e:
        print(f"  Error: {e}")
        return set()

def main():
    initial_urls = [
        "https://framerusercontent.com/sites/45PpnqmiabIc74iiRhmmhl/p1SE4HUMq.D3q7rdt2.mjs",
        "https://framerusercontent.com/sites/45PpnqmiabIc74iiRhmmhl/motion.DmuPlxYn.mjs",
        "https://framerusercontent.com/sites/45PpnqmiabIc74iiRhmmhl/augiA20Il.Br_W9N0Y.mjs",
        "https://framerusercontent.com/sites/45PpnqmiabIc74iiRhmmhl/react.BdYBBmyA.mjs",
        "https://framerusercontent.com/sites/45PpnqmiabIc74iiRhmmhl/OAUmouvm7djFQXwZ1NECw_tUWXXWzd8mYcsIfl6g-9U.CkX2PD8K.mjs",
        "https://framerusercontent.com/sites/45PpnqmiabIc74iiRhmmhl/sPkEm0yNU.BWaMewHq.mjs",
        "https://framerusercontent.com/sites/45PpnqmiabIc74iiRhmmhl/framer.CEM20w9w.mjs",
        "https://framerusercontent.com/sites/45PpnqmiabIc74iiRhmmhl/rolldown-runtime.CWR5Z7Jy.mjs",
        "https://framerusercontent.com/sites/45PpnqmiabIc74iiRhmmhl/shared-lib.CFW_xwYZ.mjs"
    ]
    
    seen = set(initial_urls)
    queue = list(initial_urls)
    
    while queue:
        url = queue.pop(0)
        new_urls = download_and_search(url)
        for u in new_urls:
            if u not in seen:
                seen.add(u)
                queue.append(u)
                
    print(f"\nAll downloaded files search finished. Checked {len(seen)} files.")

if __name__ == '__main__':
    main()
