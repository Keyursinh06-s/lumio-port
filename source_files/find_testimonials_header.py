import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    # We look for the Testimonial Badge or similar text
    # In Navbar.jsx, we have navItems with id: 'testimonials'
    # Let's search for "Testimonials" or "Testimonial" in index.html
    matches = [m.start() for m in re.finditer('Testimonial', content, re.IGNORECASE)]
    print(f"Found 'Testimonial' at indices: {matches}")
    
    for m in matches:
        print(f"\nContext at index {m}:")
        print(content[max(0, m - 500): m + 500])
        print("-" * 50)
        
if __name__ == '__main__':
    main()
