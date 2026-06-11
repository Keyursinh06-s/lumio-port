import re

def main():
    filename = 'mjs_files/OAUmouvm7djFQXwZ1NECw_tUWXXWzd8mYcsIfl6g-9U.CkX2PD8K.mjs'
    content = open(filename, encoding='utf-8').read()
    
    # We want to search for occurrences of 'aOIT9wUqb' or 'smQWHRDiU' (Enterprise variants)
    # inside property override blocks.
    # Framer uses a helper like co({ aOIT9wUqb: { ... }, smQWHRDiU: { ... } }, d, h)
    # Let's search for "aOIT9wUqb" in the file and print 150 chars around it.
    
    matches = [m.start() for m in re.finditer('aOIT9wUqb', content)]
    print(f"Found {len(matches)} occurrences of 'aOIT9wUqb':")
    for i, m in enumerate(matches):
        print(f"Match {i} (index {m}):")
        # Find the full block or print around it
        print(content[max(0, m - 100): m + 300])
        print("-" * 50)
        
if __name__ == '__main__':
    main()
