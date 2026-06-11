import re

def main():
    html_content = open('index.html', encoding='utf-8').read()
    
    # Let's search for any strings that might be inside the Enterprise plan card
    # We'll search for "Enterprise" and look at the react hydration data or json.
    # Framer stores component variant data in a JSON/JS structure, sometimes inside script tags.
    # Let's list all script tags and search for Enterprise features.
    
    # We can write a script to search for common terms: "Enterprise", "Standard", etc.
    # let's search for "Turnaround" and see what text surrounds it
    matches = re.finditer(r'Turnaround', html_content)
    for m in matches:
        start = m.start()
        print(f"Match for 'Turnaround' at {start}:")
        print(html_content[max(0, start - 150): start + 250])
        print("-" * 50)
        
    # let's search for "slack" (case insensitive)
    matches_slack = re.finditer(r'slack', html_content, re.IGNORECASE)
    print("Matches for 'slack':")
    for m in matches_slack:
        start = m.start()
        print(f"Match at {start}: {html_content[max(0, start - 100): start + 100]}")
        
    # let's search for any pricing features
    # Standard plan has:
    # "1 Active Request at a Time"
    # "3-4 Days Turnaround"
    # "Unlimited Design Requests"
    # "Up to 60 Hours of Design Work Each Month"
    # "Project Updates via Slack & Email"
    # "Basic Project Management Support"
    # "Feedback via Async & Loom"
    # Let's see if there are other strings next to these in the code.
    
if __name__ == '__main__':
    main()
