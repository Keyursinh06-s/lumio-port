import re
import json

def main():
    html_content = open('source_files/index.html', encoding='utf-8').read()
    
    # We find all svg elements that have an id="svg..."
    # Format: <svg ... id="svg...">...</svg>
    # Note that <svg> tags can have other attributes, and can contain nested paths, groups, etc.
    # We can match from <svg [^>]*id="(svg\d+)"[^>]*> to the closing </svg>
    matches = re.finditer(r'<svg\b([^>]*id="(svg\d+)"[^>]*)>(.*?)</svg>', html_content, re.DOTALL)
    
    svgs = {}
    for m in matches:
        full_tag_attrs = m.group(1)
        svg_id = m.group(2)
        content = m.group(3)
        
        # Parse viewBox and other attributes
        viewbox_match = re.search(r'viewBox="([^"]+)"', full_tag_attrs)
        viewbox = viewbox_match.group(1) if viewbox_match else None
        
        svgs[svg_id] = {
            'id': svg_id,
            'viewBox': viewbox,
            'attributes': full_tag_attrs.strip(),
            'content': content.strip()
        }
        
    print(f"Found {len(svgs)} SVG definitions with id='svg...'")
    for sid in svgs:
        print(f"  {sid}: viewBox={svgs[sid]['viewBox']}")
        
    with open('extracted_svgs.json', 'w', encoding='utf-8') as f:
        json.dump(svgs, f, indent=2)
    print("Saved to extracted_svgs.json")

if __name__ == '__main__':
    main()
