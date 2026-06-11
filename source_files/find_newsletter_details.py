import re

def main():
    content = open('source_files/index.html', encoding='utf-8').read()
    
    # Find all indices of "Subscribe"
    matches = [m.start() for m in re.finditer('Subscribe', content)]
    print(f"Found 'Subscribe' at indices: {matches}")
    
    for i, idx in enumerate(matches):
        print(f"\n--- Match {i} ---")
        # Print 1500 characters around the index
        print(content[max(0, idx - 1500): min(len(content), idx + 1500)])
        print("="*60)

if __name__ == '__main__':
    main()
