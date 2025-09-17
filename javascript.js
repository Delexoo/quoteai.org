// Qoute Website Interactivity
document.addEventListener('DOMContentLoaded', function() {
	// Animated diagonal graph background
	const canvas = document.getElementById('bg-graph');
	if (canvas) {
		const ctx = canvas.getContext('2d');
		function resizeCanvas() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		let offset = 0;
		function drawGraph() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();
			ctx.globalAlpha = 0.12;
			ctx.strokeStyle = '#222';
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
			offset += 0.2; // slow movement for grid
			if (offset > 60) offset = 0;
			drawGraph();
			requestAnimationFrame(animate);
		}
		animate();
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
		// Student Tools
		const toolsDatabase = [
	// Featured Tools (Student)
	{
		name: "Cluely",
		description: "AI study assistant for academic support",
		category: "Featured",
		page: "student.html",
		url: "https://app.cluely.com/"
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
	// AI Study Assistants (Student)
	{
		name: "Cluely",
		description: "AI study assistant for academic support",
		category: "AI Study Assistants",
		page: "student.html",
		url: "https://app.cluely.com/"
	},,
		{ name: "ChatGPT", description: "AI assistant for homework help and explanations", category: "Student - AI Study Assistants", url: "https://chat.openai.com", page: "student.html" },
		{ name: "Claude", description: "AI assistant for academic writing and research", category: "Student - AI Study Assistants", url: "https://claude.ai", page: "student.html" },
		{ name: "Perplexity", description: "AI search engine with source citations", category: "Student - AI Study Assistants", url: "https://perplexity.ai", page: "student.html" },
		{ name: "Gauth", description: "AI-powered study assistant for homework help", category: "Student - AI Study Assistants", url: "http://gauthmath.com/", page: "student.html" },
		{ name: "Photomath", description: "Camera-based math problem solver with step-by-step solutions", category: "Student - AI Study Assistants", url: "https://photomath.com", page: "student.html" },
		{ name: "Brainly", description: "Homework help and study community platform", category: "Student - AI Study Assistants", url: "https://brainly.com", page: "student.html" },
		{ name: "SaveMyGPA", description: "AI-powered study tool for GPA improvement", category: "Student - AI Study Assistants", url: "https://savemygpa.com", page: "student.html" },
		
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
