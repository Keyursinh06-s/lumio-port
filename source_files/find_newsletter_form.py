import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    # Let's search for form tags that might be the newsletter form
    # The contact section has a contact form. Let's find all forms:
    form_matches = [m.start() for m in re.finditer(r'<form\b', content)]
    print(f"Found forms at indices: {form_matches}")
    
    for i, idx in enumerate(form_matches):
        print(f"\n--- Form {i} ---")
        # Print 2000 characters before the form tag
        print(content[max(0, idx - 2000): idx + 100])
        print("="*60)

if __name__ == '__main__':
    main()
