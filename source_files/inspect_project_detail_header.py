def main():
    content = open('source_files/projects/sienna.html', encoding='utf-8').read()
    
    idx = content.find("Back to home")
    if idx != -1:
        print(f"Found Back to home at index {idx}")
        print("\n--- PROJECT DETAIL TOP HEADER CONTEXT ---")
        print(content[max(0, idx - 200): idx + 2000])
        print("="*60)
        
if __name__ == '__main__':
    main()
