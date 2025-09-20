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
	
	// Only include tools shown on the All Tools page
	const toolsDatabase = [
		{ name: "Qwen", description: "Most Advanced AI assistant for comprehensive academic support and research", category: "Student", url: "https://chat.qwen.ai/" },
		{ name: "Cluely", description: "Live interactive AI study assistant for academic support", category: "Student", url: "https://cluely.com/" },
		{ name: "SaveMyGPA", description: "AI-powered study tool for GPA improvement", category: "Student", url: "https://savemygpa.com" },
		{ name: "Claude", description: "AI assistant for academic writing and research", category: "Student", url: "https://claude.ai" },
		{ name: "Perplexity AI", description: "Research assistant with real-time information", category: "Student", url: "https://perplexity.ai" },
		{ name: "Gauth", description: "AI-powered study assistant for homework help", category: "Student", url: "https://gauthmath.com" },
		{ name: "Photomath", description: "Camera-based math problem solver with step-by-step solutions", category: "Student", url: "https://photomath.com" },
		{ name: "Brainly", description: "Homework help and study community platform", category: "Student", url: "https://brainly.com" },
		{ name: "ChatGPT", description: "AI assistant for homework help, explanations, and writing", category: "Student", url: "https://chat.openai.com" },
		{ name: "edX", description: "Free university courses from top institutions worldwide", category: "Student", url: "https://edx.org" },
		{ name: "Khan Academy", description: "Free courses in math, science, and more", category: "Student", url: "https://khanacademy.org" },
		{ name: "Coursera", description: "University courses and certifications", category: "Student", url: "https://coursera.org" },
		{ name: "MIT OCW", description: "Free MIT course materials", category: "Student", url: "https://ocw.mit.edu" },
		{ name: "Udemy", description: "Online courses on various topics and skills", category: "Student", url: "https://udemy.com" },
		{ name: "FreeCodeCamp", description: "Free programming and coding tutorials", category: "Student", url: "https://freecodecamp.org" },
		{ name: "FutureLearn", description: "Online courses from universities and institutions", category: "Student", url: "https://futurelearn.com" },
		{ name: "Anna's Archive", description: "Comprehensive free book and academic resource library", category: "Student", url: "https://annas-archive.li" },
		{ name: "Library Genesis", description: "Free scientific and academic book repository", category: "Student", url: "https://libgen.ac" },
		{ name: "Website to .pdf", description: "Convert a Website (link) into a PDF document", category: "Student", url: "https://webtopdf.com" },
		{ name: "ElevenLabs", description: "Immersive reader with text-to-speech (mobile free)", category: "Student", url: "https://elevenlabs.io/" },
		{ name: "iLovePDF", description: "PDF splitter and comprehensive PDF editing toolkit", category: "Student", url: "https://www.ilovepdf.com/split_pdf" },
		{ name: ".docx to .pdf", description: "Convert Word documents to PDF format easily", category: "Student", url: "https://www.ilovepdf.com/word_to_pdf" },
		{ name: "PowerPoint to .pdf", description: "Convert PowerPoint presentations to PDF format", category: "Student", url: "https://www.ilovepdf.com/powerpoint_to_pdf" },
		{ name: "OneDrive Mobile", description: "Scan documents to PDF using your mobile device", category: "Student", url: "https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage" },
		{ name: "CloudConvert", description: "Multi-format file converter and processing tool", category: "Student", url: "https://cloudconvert.com" },
		{ name: "FreeConvert", description: "Multifunctional file converter for various formats", category: "Student", url: "https://freeconvert.com" },
		{ name: "Speechify", description: "Text-to-speech tool for listening to documents", category: "Student", url: "https://speechify.com" },
		{ name: "Scribe", description: "Automatic step-by-step guide and documentation creator", category: "Student", url: "https://scribehow.com/" },
		{ name: "Plagly", description: "Free plagiarism checker for academic writing", category: "Student", url: "https://plagly.com/?msclkid=1432e4ea364a1c0292458c23e9dcef4a&utm_source=bing&utm_medium=cpc&utm_campaign=plag&utm_term=free%20plagiarism%20checker&utm_content=plagly" },
		{ name: "Small SEO Tools", description: "Free online plagiarism detection and checking tool", category: "Student", url: "https://smallseotools.com/plagiarism-checker/" },
		{ name: "Scribbr", description: "Academic plagiarism checker with detailed reports", category: "Student", url: "https://www.scribbr.com/plagiarism-checker/" },
		{ name: "Notion", description: "All-in-one workspace for notes and planning", category: "Student", url: "https://notion.so" },
		// Professional Tools
		{ name: "Grammarly", description: "Writing assistant for professional communication", category: "Professional", url: "https://grammarly.com" },
		{ name: "Jasper AI", description: "AI content creation for marketing", category: "Professional", url: "https://jasper.ai" },
		{ name: "Copy.ai", description: "AI-powered copywriting tool", category: "Professional", url: "https://copy.ai" },
		{ name: "Writesonic", description: "AI writing assistant for marketing content", category: "Professional", url: "https://writesonic.com" },
		{ name: "Tome", description: "AI-powered presentation creation tool", category: "Professional", url: "https://tome.app" },
		{ name: "Trello", description: "Visual project management with boards", category: "Professional", url: "https://trello.com" },
		{ name: "Asana", description: "Team collaboration and task management", category: "Professional", url: "https://asana.com" },
		{ name: "Monday.com", description: "Work operating system for teams", category: "Professional", url: "https://monday.com" },
		{ name: "Notion", description: "All-in-one workspace for teams and projects", category: "Professional", url: "https://notion.so" },
		{ name: "ClickUp", description: "Complete productivity and project management platform", category: "Professional", url: "https://clickup.com" },
		{ name: "Basecamp", description: "Simple project management and team collaboration", category: "Professional", url: "https://basecamp.com" },
		{ name: "Slack", description: "Team messaging and collaboration", category: "Professional", url: "https://slack.com" },
		{ name: "Zoom", description: "Video conferencing and meetings", category: "Professional", url: "https://zoom.us" },
		{ name: "Calendly", description: "Automated scheduling tool", category: "Professional", url: "https://calendly.com" },
		{ name: "Discord", description: "Team communication and voice chat platform", category: "Professional", url: "https://discord.com" },
		{ name: "Microsoft Teams", description: "Business communication and collaboration platform", category: "Professional", url: "https://microsoft.com/teams" },
		{ name: "Whereby", description: "Simple video meetings and conferencing", category: "Professional", url: "https://whereby.com" },
		{ name: "Funnel.io", description: "Marketing data collection and attribution platform", category: "Professional", url: "https://funnel.io" },
		{ name: "Google Analytics", description: "Web analytics and insights", category: "Professional", url: "https://analytics.google.com" },
		{ name: "Tableau Public", description: "Free data visualization tool", category: "Professional", url: "https://public.tableau.com" },
		{ name: "Airtable", description: "Database and spreadsheet hybrid", category: "Professional", url: "https://airtable.com" },
		{ name: "Mixpanel", description: "Product analytics and user behavior tracking", category: "Professional", url: "https://mixpanel.com" },
		{ name: "Hotjar", description: "Website heatmaps and user session recordings", category: "Professional", url: "https://hotjar.com" },
		{ name: "Zapier", description: "Workflow automation and app integration platform", category: "Professional", url: "https://zapier.com" },
		// Creator Tools
		{ name: "Midjourney", description: "High-quality AI art generation", category: "Creator", url: "https://midjourney.com" },
		{ name: "Stable Diffusion", description: "Open-source AI image generator", category: "Creator", url: "https://stability.ai" },
		{ name: "Leonardo AI", description: "AI art generation with advanced controls", category: "Creator", url: "https://leonardo.ai" },
		{ name: "Playground AI", description: "Free AI image generation and editing", category: "Creator", url: "https://playground.ai" },
		{ name: "Adobe Firefly", description: "Adobe's AI image and text generation tool", category: "Creator", url: "https://firefly.adobe.com" },
		{ name: "Canva", description: "Easy-to-use design platform", category: "Creator", url: "https://canva.com" },
		{ name: "Figma", description: "Collaborative design and prototyping", category: "Creator", url: "https://figma.com" },
		{ name: "GIMP", description: "Free photo editing software", category: "Creator", url: "https://gimp.org" },
		{ name: "Photopea", description: "Free online photo editor similar to Photoshop", category: "Creator", url: "https://www.photopea.com" },
		{ name: "Sketch", description: "Vector graphics and UI design tool", category: "Creator", url: "https://sketch.com" },
		{ name: "Adobe Illustrator", description: "Professional vector graphics software", category: "Creator", url: "https://www.adobe.com/products/illustrator.html" },
		{ name: "DaVinci Resolve", description: "Professional free video editor", category: "Creator", url: "https://blackmagicdesign.com/products/davinciresolve" },
		{ name: "Audacity", description: "Free audio editing software", category: "Creator", url: "https://audacityteam.org" },
		{ name: "OBS Studio", description: "Free streaming and recording software", category: "Creator", url: "https://obsproject.com" },
		{ name: "Loom", description: "Easy screen recording and video messaging", category: "Creator", url: "https://loom.com" },
		{ name: "Clipchamp", description: "Online video editor and creator", category: "Creator", url: "https://clipchamp.com" },
		{ name: "Runway ML", description: "AI-powered video editing and generation", category: "Creator", url: "https://runway.ml" },
		{ name: "REAPER", description: "Professional digital audio workstation", category: "Creator", url: "https://reaper.fm" },
		{ name: "Unsplash", description: "Free high-quality stock photos", category: "Creator", url: "https://unsplash.com" },
		{ name: "Pexels", description: "Free stock photos and videos", category: "Creator", url: "https://pexels.com" },
		{ name: "Remove.bg", description: "AI background removal tool", category: "Creator", url: "https://remove.bg" },
		{ name: "Watermark Remover", description: "Free AI-powered watermark removal tool", category: "Creator", url: "https://www.watermarkremover.io" },
		{ name: "Pixabay", description: "Free images, videos, and music", category: "Creator", url: "https://pixabay.com" },
		{ name: "Iconify", description: "Free icon library with thousands of icons", category: "Creator", url: "https://iconify.design" },
		{ name: "Coolors", description: "Color palette generator and design tool", category: "Creator", url: "https://coolors.co" },
		{ name: "Buffer", description: "Social media management and scheduling", category: "Creator", url: "https://buffer.com" }
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
