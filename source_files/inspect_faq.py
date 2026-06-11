import re

def main():
    filename = 'mjs_files/OAUmouvm7djFQXwZ1NECw_tUWXXWzd8mYcsIfl6g-9U.CkX2PD8K.mjs'
    content = open(filename, encoding='utf-8').read()
    
    # Let's search for FAQ items
    # Standard questions:
    # 1. "How does the design process work?"
    # 2. "What if I need more revisions?"
    # 3. "How long does it take to complete a request?"
    # 4. "What’s the difference between the Standard and Enterprise plans?"
    # 5. "How do we communicate throughout the project?"
    # 6. "Can I pause or cancel my subscription anytime?"
    
    questions = [
        "How does the design process work?",
        "What if I need more revisions?",
        "How long does it take to complete a request?",
        "What's the difference between the Standard and Enterprise plans?",
        "How do we communicate throughout the project?",
        "Can I pause or cancel my subscription anytime?"
    ]
    
    for q in questions:
        # Search case-insensitively or with a fuzzy match since quotes might be different (e.g. curly quotes)
        # We can extract the answer text which is usually nearby.
        # Let's search for the first 30 chars of the question
        short_q = q[:30].replace("'", "").replace("'", "'")
        # Let's find matches for short_q or part of it
        pat = re.compile(re.escape(q[:20]), re.IGNORECASE)
        matches = [m.start() for m in pat.finditer(content)]
        print(f"\nQuestion: '{q}' (found {len(matches)} times)")
        for m in matches:
            print(f"Context at {m}:")
            print(content[max(0, m - 50): m + 600])
            print("-" * 50)

if __name__ == '__main__':
    main()
