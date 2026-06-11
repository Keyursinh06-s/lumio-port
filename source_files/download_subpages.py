import urllib.request
import os

def download_page(path):
    url = f"https://jaxorion.framer.website/{path}"
    print(f"Downloading {url}...")
    try:
        response = urllib.request.urlopen(url)
        content = response.read().decode('utf-8')
        
        # Create directory if it doesn't exist
        local_path = os.path.join(*path.split('/'))
        dir_name = os.path.dirname(local_path)
        if dir_name and not os.path.exists(dir_name):
            os.makedirs(dir_name)
            
        with open(local_path + ".html", 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Saved to {local_path}.html ({len(content)} bytes)")
    except Exception as e:
        print(f"  Error downloading {url}: {e}")

def main():
    projects = [
        "projects/growly",
        "projects/vaultx",
        "projects/sienna",
        "projects/glidex",
        "projects/aether-studio"
    ]
    for proj in projects:
        download_page(proj)

if __name__ == '__main__':
    main()
