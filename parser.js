/**
 * MD-Parser-Pro v1.2.0
 * Advanced Markdown-to-HTML Transformation Engine
 * Features: Regex Optimization, XSS Sanitization, and Performance Tracking
 */

class MarkdownParser {
    constructor(options = {}) {
        this.options = options;
        this.iterationCount = 0;
        
        // Define high-performance Regex patterns
        this.rules = [
            { name: 'h1', regex: /^# (.*$)/gm, replace: '<h1>$1</h1>' },
            { name: 'h2', regex: /^## (.*$)/gm, replace: '<h2>$1</h2>' },
            { name: 'h3', regex: /^### (.*$)/gm, replace: '<h3>$1</h3>' },
            { name: 'bold', regex: /\*\*(.*?)\*\*/g, replace: '<strong>$1</strong>' },
            { name: 'italic', regex: /\*(.*?)\*/g, replace: '<em>$1</em>' },
            { name: 'code', regex: /`(.*?)`/g, replace: '<code>$1</code>' },
            { name: 'blockquote', regex: /^\> (.*$)/gm, replace: '<blockquote>$1</blockquote>' },
            { name: 'horizontal_rule', regex: /^---$/gm, replace: '<hr />' },
            { name: 'list_item', regex: /^\s*\*\s(.*$)/gm, replace: '<li>$1</li>' }
        ];
    }

    /**
     * Sanitizes HTML to prevent XSS attacks
     */
    sanitize(html) {
        return html
            .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
            .replace(/on\w+="[^"]*"/gim, "");
    }

    /**
     * Core Parsing Logic
     */
    parse(markdown) {
        const startTime = performance.now();
        let html = markdown;

        // Apply Transformation Rules
        this.rules.forEach(rule => {
            html = html.replace(rule.regex, rule.replace);
        });

        // Post-processing for Lists
        html = html.replace(/<\/li>\s*<li>/g, '</li><li>');
        html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

        const cleanHtml = this.sanitize(html);
        const endTime = performance.now();
        
        this.iterationCount++;
        console.log(`[MD-Parser-Pro] Parse #${this.iterationCount} completed in ${(endTime - startTime).toFixed(4)}ms`);
        
        return cleanHtml;
    }
}

// Instantiate and Export for Project Use
const engine = new MarkdownParser();
const sampleInput = "# Welcome\nThis is a **Pro** parser.\n* Feature 1\n* Feature 2";
console.log(engine.parse(sampleInput));
