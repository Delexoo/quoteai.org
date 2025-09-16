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
});
