import html.parser
import os
import re
import json
import sys

class ProjectParser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.in_script_style = False
    def handle_starttag(self, tag, attrs):
        if tag in ['script', 'style']: self.in_script_style = True
    def handle_endtag(self, tag):
        if tag in ['script', 'style']: self.in_script_style = False
    def handle_data(self, data):
        if not self.in_script_style:
            t = data.strip()
            if t: self.text.append(t)

def extract_project_data(filename):
    filepath = os.path.join('source_files/projects', filename)
    content = open(filepath, encoding='utf-8').read()
    
    slug = filename.replace('.html', '')
    
    title_match = re.search(r'<title>(.*?)</title>', content)
    title = title_match.group(1).split(' - ')[0] if title_match else ""
    
    desc_match = re.search(r'<meta name="description" content="(.*?)"', content)
    description = desc_match.group(1) if desc_match else ""
    
    # Find all images
    imgs = re.findall(r'https://framerusercontent\.com/images/[^\s"\')\?]+', content)
    # Deduplicate while preserving order
    seen_imgs = []
    for img in imgs:
        if img not in seen_imgs:
            seen_imgs.append(img)
            
    parser = ProjectParser()
    parser.feed(content)
    text_lines = parser.text
    
    client = ""
    service = ""
    date = ""
    overview = ""
    why_title = ""
    points = []
    closing_text = ""
    cta_text = ""
    
    for i, line in enumerate(text_lines):
        if line.lower() == 'client':
            client = text_lines[i+1]
        elif line.lower() == 'service':
            service = text_lines[i+1]
        elif line.lower() == 'date':
            date = text_lines[i+1]
        elif line.startswith('Overview:'):
            overview = text_lines[i+1]
        elif line.startswith('Why ') or line == 'Key Features:':
            why_title = line
            points = text_lines[i+1 : i+6]
            closing_text = text_lines[i+6]
            cta_text = text_lines[i+7]

    # Find next project slug/title
    next_slug = ""
    next_title = ""
    next_subtitle = ""
    for i, line in enumerate(text_lines):
        if line == 'Next' and i+1 < len(text_lines) and text_lines[i+1] == 'Project':
            idx = i + 2
            while idx < len(text_lines):
                val = text_lines[idx]
                if val in ['Sienna', 'Growly', 'Glidex', 'Aether Studio', 'VaultX']:
                    next_title = val
                    next_slug = val.lower().replace(' ', '-')
                    if idx + 1 < len(text_lines):
                        next_subtitle = text_lines[idx+1]
                    break
                idx += 1
            break
            
    return {
        'slug': slug,
        'title': title,
        'subtitle': description,
        'client': client,
        'service': service,
        'date': date,
        'overview': overview,
        'whyTitle': why_title,
        'points': points,
        'closingText': closing_text,
        'ctaText': cta_text,
        'nextSlug': next_slug,
        'nextTitle': next_title,
        'nextSubtitle': next_subtitle,
        'images': seen_imgs
    }

def main():
    sys.stdout.reconfigure(encoding='utf-8')
    projects_dir = 'source_files/projects'
    files = [f for f in os.listdir(projects_dir) if f.endswith('.html')]
    
    projects_data = []
    for f in files:
        data = extract_project_data(f)
        projects_data.append(data)
        
    # Write to assets JSON
    with open('src/assets/projects_data.json', 'w', encoding='utf-8') as outfile:
        json.dump(projects_data, outfile, indent=2)
        
    print(f"Extracted data for {len(projects_data)} projects and saved to src/assets/projects_data.json")
    for proj in projects_data:
        print(f"\nProject: {proj['title']}")
        print(f"  Client: {proj['client']}")
        print(f"  Service: {proj['service']}")
        print(f"  Date: {proj['date']}")
        print(f"  Why Title: {proj['whyTitle']}")
        print(f"  Points: {len(proj['points'])} items")
        for pt in proj['points']:
            print(f"    - {pt}")
        print(f"  Next: {proj['nextTitle']} ({proj['nextSlug']})")
        print(f"  Images count: {len(proj['images'])}")

if __name__ == '__main__':
    main()
