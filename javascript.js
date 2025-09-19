// Qoute Website Interactivity
document.addEventListener('DOMContentLoaded', function() {
	// Animated diagonal graph background
	const canvas = document.getElementById('bg-graph');
	console.log('Canvas element found:', canvas);
	if (canvas) {
		const ctx = canvas.getContext('2d');
		console.log('Canvas context:', ctx);
		function resizeCanvas() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			console.log('Canvas resized to:', canvas.width, 'x', canvas.height);
		}
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		let offset = 0;
		function drawGraph() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();
			ctx.globalAlpha = 0.15;
			ctx.strokeStyle = '#000000';
			ctx.lineWidth = 1;
			
			let gridSize = 60;
			
			// Draw vertical lines
			for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
				ctx.beginPath();
				ctx.moveTo(x + offset, 0);
				ctx.lineTo(x + offset, canvas.height);
				ctx.stroke();
			}
			
			// Draw horizontal lines
			for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
				ctx.beginPath();
				ctx.moveTo(0, y + offset * 0.5);
				ctx.lineTo(canvas.width, y + offset * 0.5);
				ctx.stroke();
			}
			
			ctx.restore();
		}
		function animate() {
			offset += 0.1; // slow movement for grid
			if (offset > 60) offset = 0;
			drawGraph();
			requestAnimationFrame(animate);
		}
		animate();
	}

	// Click-to-dismiss notification
	const notification = document.getElementById('pageNotification');
	if (notification) {
		notification.addEventListener('click', function() {
			notification.classList.add('clicked');
			// Hide the notification after the animation completes
			setTimeout(() => {
				notification.style.display = 'none';
			}, 400); // Match the CSS animation duration
		});
		
		// Add cursor pointer to indicate clickability
		notification.style.cursor = 'pointer';
	}

	// Animated dropdown menu
	const menuToggle = document.getElementById('menu-toggle');
	const dropdownMenu = document.getElementById('dropdown-menu');
	
	if (menuToggle && dropdownMenu) {
		menuToggle.addEventListener('click', function() {
			menuToggle.classList.toggle('active');
			dropdownMenu.classList.toggle('active');
		});

		// Close dropdown when clicking outside
		document.addEventListener('click', function(event) {
			if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
				menuToggle.classList.remove('active');
				dropdownMenu.classList.remove('active');
			}
		});
	}

	// Secret button functionality
	const secretButton = document.getElementById('secretButton');
	const secretBubble = document.getElementById('secretBubble');
	const bubbleClose = document.getElementById('bubbleClose');
	
	if (secretButton && secretBubble) {
		secretButton.addEventListener('click', function(event) {
			event.stopPropagation();
			secretBubble.classList.toggle('show');
		});

		// Close button functionality
		if (bubbleClose) {
			bubbleClose.addEventListener('click', function(event) {
				event.stopPropagation();
				secretBubble.classList.remove('show');
			});
		}

		// Close bubble when clicking outside
		document.addEventListener('click', function(event) {
			if (!secretButton.contains(event.target) && !secretBubble.contains(event.target)) {
				secretBubble.classList.remove('show');
			}
		});
	}

	// Smooth scrolling for navigation links
	const navLinks = document.querySelectorAll('.minimal-nav a');
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			const href = this.getAttribute('href');
			if (href.startsWith('#')) {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					target.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			}
		});
	});

	// Global Search Functionality
	const searchInput = document.getElementById('global-search');
	const searchResults = document.getElementById('search-results');
	
	// Database of all tools from all categories
	const toolsDatabase = [
	// Featured Tools (Student)
	{
		name: "Cluely",
		description: "AI study assistant for academic support",
		category: "Featured",
		page: "student.html",
		url: "https://cluely.com/"
	},
	{
		name: "BetterCampus",
		description: "Chrome extension to enhance Canvas LMS experience", 
		category: "Featured",
		page: "student.html",
		url: "https://www.bettercanvas.org/"
	},
	{
		name: "ElevenLabs",
		description: "Immersive reader with text-to-speech (mobile free)",
		category: "Featured", 
		page: "student.html",
		url: "https://elevenlabs.io/"
	},
	{
		name: "Qwen",
		description: "Advanced AI assistant for comprehensive academic support and research",
		category: "Featured",
		page: "student.html",
		url: "https://chat.qwen.ai/"
	},
	// AI Study Assistants (Student)
	{
		name: "Cluely",
		description: "AI study assistant for academic support",
		category: "AI Study Assistants",
		page: "student.html",
		url: "https://cluely.com/"
	},,
		{ name: "ChatGPT", description: "AI assistant for homework help and explanations", category: "Student - AI Study Assistants", url: "https://chat.openai.com", page: "student.html" },
		{ name: "Claude", description: "AI assistant for academic writing and research", category: "Student - AI Study Assistants", url: "https://claude.ai", page: "student.html" },
		{ name: "Perplexity", description: "AI search engine with source citations", category: "Student - AI Study Assistants", url: "https://perplexity.ai", page: "student.html" },
		{ name: "Gauth", description: "AI-powered study assistant for homework help", category: "Student - AI Study Assistants", url: "http://gauthmath.com/", page: "student.html" },
		{ name: "Photomath", description: "Camera-based math problem solver with step-by-step solutions", category: "Student - AI Study Assistants", url: "https://photomath.com", page: "student.html" },
		{ name: "Brainly", description: "Homework help and study community platform", category: "Student - AI Study Assistants", url: "https://brainly.com", page: "student.html" },
		{ name: "SaveMyGPA", description: "AI-powered study tool for GPA improvement", category: "Student - AI Study Assistants", url: "https://savemygpa.com", page: "student.html" },
		{ name: "Qwen", description: "Advanced AI assistant for comprehensive academic support and research", category: "Student - AI Study Assistants", url: "https://chat.qwen.ai/", page: "student.html" },
		
		{ name: "Citation Machine", description: "Automatic citation generator", category: "Student - Research & Citations", url: "https://citationmachine.net", page: "student.html" },
		{ name: "Google Scholar", description: "Academic search engine for scholarly literature", category: "Student - Research & Citations", url: "https://scholar.google.com", page: "student.html" },
		{ name: "Zotero", description: "Reference management and citation tool", category: "Student - Research & Citations", url: "https://zotero.org", page: "student.html" },
		
		{ name: "ElevenLabs", description: "Immersive reader with text-to-speech (mobile free)", category: "Student - PDF & Document Tools", url: "https://elevenlabs.io/", page: "student.html" },
		{ name: "iLovePDF", description: "PDF splitter and comprehensive PDF editing toolkit", category: "Student - PDF & Document Tools", url: "https://www.ilovepdf.com/split_pdf", page: "student.html" },
		{ name: ".docx to .pdf", description: "Convert Word documents to PDF format easily", category: "Student - PDF & Document Tools", url: "https://www.ilovepdf.com/word_to_pdf", page: "student.html" },
		{ name: "OneDrive Mobile", description: "Scan documents to PDF using your mobile device", category: "Student - PDF & Document Tools", url: "https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage", page: "student.html" },
		{ name: "CloudConvert", description: "Multi-format file converter and processing tool", category: "Student - PDF & Document Tools", url: "https://cloudconvert.com", page: "student.html" },
		{ name: "FreeConvert", description: "Multifunctional file converter for various formats", category: "Student - PDF & Document Tools", url: "https://freeconvert.com", page: "student.html" },
		{ name: "Speechify", description: "Text-to-speech tool for listening to documents", category: "Student - PDF & Document Tools", url: "https://speechify.com", page: "student.html" },
		
		{ name: "edX", description: "Free university courses from top institutions worldwide", category: "Student - Free Courses & Educational Resources", url: "https://edx.org", page: "student.html" },
		{ name: "Khan Academy", description: "Free courses in math, science, and more", category: "Student - Free Courses & Educational Resources", url: "https://khanacademy.org", page: "student.html" },
		{ name: "Coursera", description: "University courses and certifications", category: "Student - Free Courses & Educational Resources", url: "https://coursera.org", page: "student.html" },
		{ name: "MIT OpenCourseWare", description: "Free MIT course materials", category: "Student - Free Courses & Educational Resources", url: "https://ocw.mit.edu", page: "student.html" },
		{ name: "Udemy", description: "Online courses on various topics and skills", category: "Student - Free Courses & Educational Resources", url: "https://udemy.com", page: "student.html" },
		{ name: "FreeCodeCamp", description: "Free programming and coding tutorials", category: "Student - Free Courses & Educational Resources", url: "https://freecodecamp.org", page: "student.html" },
		{ name: "FutureLearn", description: "Online courses from universities and institutions", category: "Student - Free Courses & Educational Resources", url: "https://futurelearn.com", page: "student.html" },
		
		{ name: "Notion", description: "All-in-one workspace for notes and planning", category: "Student - Note Taking & Organization", url: "https://notion.so", page: "student.html" },
		{ name: "Standard Notes", description: "Safe note-taking with end-to-end encryption", category: "Student - Note Taking & Organization", url: "https://standardnotes.com", page: "student.html" },
		{ name: "Microsoft To Do", description: "Task management and to-do list organization", category: "Student - Note Taking & Organization", url: "https://todo.microsoft.com", page: "student.html" },
		{ name: "BetterCampus", description: "Formerly BetterCanvas - Chrome extension to enhance Canvas LMS", category: "Student - Note Taking & Organization", url: "https://www.bettercanvas.org/", page: "student.html" },
		
		{ name: "Mathway", description: "Math problem solver with instant solutions", category: "Student - Extras", url: "https://mathway.com", page: "student.html" },
		{ name: "Character.ai", description: "AI chatbot for creative conversations and learning", category: "Student - Extras", url: "https://character.ai", page: "student.html" },
		{ name: "Canva", description: "Easy-to-use design platform for presentations and graphics", category: "Student - Extras", url: "https://canva.com", page: "student.html" },
		
		// Professional Tools
		{ name: "Grammarly", description: "Writing assistant for professional communication", category: "Professional - AI Business Assistants", url: "https://grammarly.com", page: "professional.html" },
		{ name: "Jasper AI", description: "AI content creation for marketing", category: "Professional - AI Business Assistants", url: "https://jasper.ai", page: "professional.html" },
		{ name: "Copy.ai", description: "AI-powered copywriting tool", category: "Professional - AI Business Assistants", url: "https://copy.ai", page: "professional.html" },
		
		{ name: "Trello", description: "Visual project management with boards", category: "Professional - Project Management", url: "https://trello.com", page: "professional.html" },
		{ name: "Asana", description: "Team collaboration and task management", category: "Professional - Project Management", url: "https://asana.com", page: "professional.html" },
		{ name: "Monday.com", description: "Work operating system for teams", category: "Professional - Project Management", url: "https://monday.com", page: "professional.html" },
		
		{ name: "Slack", description: "Team messaging and collaboration", category: "Professional - Communication & Collaboration", url: "https://slack.com", page: "professional.html" },
		{ name: "Zoom", description: "Video conferencing and meetings", category: "Professional - Communication & Collaboration", url: "https://zoom.us", page: "professional.html" },
		{ name: "Calendly", description: "Automated scheduling tool", category: "Professional - Communication & Collaboration", url: "https://calendly.com", page: "professional.html" },
		
		// Creator Tools
		{ name: "DALL-E 3", description: "AI image generation from text prompts", category: "Creator - AI Art & Design", url: "https://openai.com/dall-e-3", page: "creator.html" },
		{ name: "Midjourney", description: "High-quality AI art generation", category: "Creator - AI Art & Design", url: "https://midjourney.com", page: "creator.html" },
		{ name: "Stable Diffusion", description: "Open-source AI image generator", category: "Creator - AI Art & Design", url: "https://stability.ai", page: "creator.html" },
		
		{ name: "Canva", description: "Easy-to-use design platform", category: "Creator - Graphic Design", url: "https://canva.com", page: "creator.html" },
		{ name: "Figma", description: "Collaborative design and prototyping", category: "Creator - Graphic Design", url: "https://figma.com", page: "creator.html" },
		{ name: "GIMP", description: "Free photo editing software", category: "Creator - Graphic Design", url: "https://gimp.org", page: "creator.html" },
		
		{ name: "DaVinci Resolve", description: "Professional free video editor", category: "Creator - Video & Audio", url: "https://blackmagicdesign.com/products/davinciresolve", page: "creator.html" },
		{ name: "Audacity", description: "Free audio editing software", category: "Creator - Video & Audio", url: "https://audacityteam.org", page: "creator.html" },
		{ name: "OBS Studio", description: "Free streaming and recording software", category: "Creator - Video & Audio", url: "https://obsproject.com", page: "creator.html" }
	];
	
	if (searchInput && searchResults) {
		let searchTimeout;
		
		// Helper function for flexible character matching
		function fuzzyMatch(text, query) {
			text = text.toLowerCase();
			query = query.toLowerCase();
			
			// First try exact substring match (fastest)
			if (text.includes(query)) {
				return true;
			}
			
			// Then try character sequence matching
			let textIndex = 0;
			let queryIndex = 0;
			
			while (textIndex < text.length && queryIndex < query.length) {
				if (text[textIndex] === query[queryIndex]) {
					queryIndex++;
				}
				textIndex++;
			}
			
			return queryIndex === query.length;
		}
		
		searchInput.addEventListener('input', function() {
			clearTimeout(searchTimeout);
			const query = this.value.trim().toLowerCase();
			
			if (query.length < 2) {
				searchResults.classList.remove('show');
				return;
			}
			
			searchTimeout = setTimeout(() => {
				const filteredTools = toolsDatabase.filter(tool => 
					fuzzyMatch(tool.name, query) ||
					fuzzyMatch(tool.description, query) ||
					fuzzyMatch(tool.category, query)
				);
				
				displaySearchResults(filteredTools);
			}, 300);
		});
		
		// Close search results when clicking outside
		document.addEventListener('click', function(event) {
			if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
				searchResults.classList.remove('show');
			}
		});
		
		function displaySearchResults(results) {
			if (results.length === 0) {
				searchResults.innerHTML = '<div class="search-result-item">No tools found</div>';
				searchResults.classList.add('show');
				return;
			}
			
			const html = results.slice(0, 8).map(tool => `
				<div class="search-result-item" onclick="window.open('${tool.url}', '_blank')">
					<div class="search-result-title">${tool.name}</div>
					<div class="search-result-desc">${tool.description}</div>
					<div class="search-result-category">${tool.category}</div>
				</div>
			`).join('');
			
			searchResults.innerHTML = html;
			searchResults.classList.add('show');
		}
	}
});

// Legal Modal Functionality
const legalContent = {
	terms: {
		title: "Terms of Service",
		content: `
			<h3>1. Acceptance of Terms</h3>
			<p>By accessing and using Quoteai.org, you accept and agree to be bound by the terms and provision of this agreement.</p>
			
			<h3>2. Use License</h3>
			<p>Permission is granted to temporarily download one copy of the materials on Quoteai.org for personal, non-commercial transitory viewing only.</p>
			<ul>
				<li>This is the grant of a license, not a transfer of title</li>
				<li>Under this license you may not modify or copy the materials</li>
				<li>Use the materials for any commercial purpose or for any public display</li>
				<li>Attempt to reverse engineer any software contained on the website</li>
			</ul>
			
			<h3>3. Disclaimer</h3>
			<p>The materials on Quoteai.org are provided on an 'as is' basis. Quoteai.org makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
			
			<h3>4. Limitations</h3>
			<p>In no event shall Quoteai.org or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Quoteai.org, even if Quoteai.org or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
		`
	},
	privacy: {
		title: "Privacy Policy",
		content: `
			<h3>Information We Collect</h3>
			<p>Quoteai.org is committed to protecting your privacy. We collect minimal information to provide you with the best educational resource experience.</p>
			
			<h3>What We Collect:</h3>
			<ul>
				<li><strong>Usage Data:</strong> Anonymous analytics about page visits and popular tools</li>
				<li><strong>Search Queries:</strong> To improve our search functionality and tool recommendations</li>
				<li><strong>Technical Data:</strong> Browser type, device information for optimization purposes</li>
			</ul>
			
			<h3>What We Don't Collect:</h3>
			<ul>
				<li>Personal identification information</li>
				<li>Email addresses (unless voluntarily provided for contact)</li>
				<li>Financial information</li>
				<li>Location data beyond general geographic region</li>
			</ul>
			
			<h3>How We Use Information</h3>
			<p>Any data collected is used solely to:</p>
			<ul>
				<li>Improve website functionality and user experience</li>
				<li>Analyze which educational tools are most helpful</li>
				<li>Optimize site performance and loading times</li>
				<li>Respond to user inquiries when contacted directly</li>
			</ul>
			
			<h3>Data Security</h3>
			<p>We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of information.</p>
		`
	},
	cookies: {
		title: "Cookie Policy",
		content: `
			<h3>What Are Cookies</h3>
			<p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.</p>
			
			<h3>How We Use Cookies</h3>
			<p>Quoteai.org uses cookies to:</p>
			<ul>
				<li><strong>Essential Cookies:</strong> Enable basic website functionality and navigation</li>
				<li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
				<li><strong>Preference Cookies:</strong> Remember your search preferences and settings</li>
			</ul>
			
			<h3>Types of Cookies We Use</h3>
			<ul>
				<li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
				<li><strong>Persistent Cookies:</strong> Remain on your device for a set period to remember your preferences</li>
				<li><strong>Third-party Cookies:</strong> From analytics services to help improve our site</li>
			</ul>
			
			<h3>Managing Cookies</h3>
			<p>You can control and manage cookies in various ways:</p>
			<ul>
				<li>Most browsers allow you to refuse cookies or delete existing ones</li>
				<li>You can set your browser to notify you when cookies are being sent</li>
				<li>Some features may not function properly if cookies are disabled</li>
			</ul>
			
			<h3>Contact Us</h3>
			<p>If you have questions about our cookie policy, please contact us through our Discord: @delexostudios</p>
		`
	},
	disclaimer: {
		title: "Disclaimer",
		content: `
			<h3>Educational Resource Disclaimer</h3>
			<p>Quoteai.org serves as an educational resource platform that curates and links to external tools, websites, and services. Please read this disclaimer carefully.</p>
			
			<h3>External Links and Third-Party Content</h3>
			<ul>
				<li>We provide links to external websites and tools for educational purposes</li>
				<li>We are not responsible for the content, privacy policies, or practices of external sites</li>
				<li>Links do not constitute endorsement of any specific service or company</li>
				<li>External sites may have different terms of use and privacy policies</li>
			</ul>
			
			<h3>Information Accuracy</h3>
			<ul>
				<li>We strive to provide accurate and up-to-date information</li>
				<li>Tool availability, features, and pricing may change without notice</li>
				<li>We recommend verifying information on the official websites</li>
				<li>Some tools may require registration or have usage limitations</li>
			</ul>
			
			<h3>Educational Purpose</h3>
			<ul>
				<li>Our platform is designed for educational and informational purposes</li>
				<li>Users are responsible for how they use the linked tools and resources</li>
				<li>We encourage ethical and legal use of all educational resources</li>
				<li>Academic integrity policies of your institution should be followed</li>
			</ul>
			
			<h3>No Warranty</h3>
			<p>The information and tools linked on Quoteai.org are provided "as is" without any warranties. We make no guarantees about the effectiveness, availability, or suitability of any external tools for specific educational needs.</p>
			
			<h3>Limitation of Liability</h3>
			<p>Quoteai.org and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our platform or any linked external resources.</p>
		`
	}
};

function openModal(type) {
	const modal = document.getElementById('modalOverlay');
	const title = document.getElementById('modalTitle');
	const body = document.getElementById('modalBody');
	
	if (legalContent[type]) {
		title.textContent = legalContent[type].title;
		body.innerHTML = legalContent[type].content;
		modal.classList.add('show');
		document.body.style.overflow = 'hidden'; // Prevent background scrolling
	}
}

function closeModal() {
	const modal = document.getElementById('modalOverlay');
	modal.classList.remove('show');
	document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
		closeModal();
	}
});
