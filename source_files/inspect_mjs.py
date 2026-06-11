import re

def main():
    filename = 'mjs_files/OAUmouvm7djFQXwZ1NECw_tUWXXWzd8mYcsIfl6g-9U.CkX2PD8K.mjs'
    try:
        content = open(filename, encoding='utf-8').read()
        print(f"File size: {len(content)} bytes")
        
        # Let's search for "Enterprise" in the file and print surrounding text (more details)
        matches = [m.start() for m in re.finditer('Enterprise', content)]
        print(f"Found {len(matches)} occurrences of 'Enterprise':")
        for i, m in enumerate(matches):
            print(f"Occurrence {i}: index {m}")
            print(content[max(0, m-250): m+400])
            print("="*60)
            
        # Let's see if we can find other pricing text or standard features
        # For example, "Enterprise" plan properties like turnaround, price, active requests etc.
        # Let's search for "project" or "month" or "Days" in this file
        days_matches = [m.start() for m in re.finditer(r'\d-\d\s*Days', content)]
        print(f"\nFound {len(days_matches)} occurrences of 'Days' patterns:")
        for m in days_matches:
            print(content[max(0, m-100): m+100])
            print("-" * 40)
            
    except Exception as e:
        print("Error:", e)

if __name__ == '__main__':
    main()
