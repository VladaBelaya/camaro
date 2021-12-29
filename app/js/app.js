// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {
	const mainPage = document.querySelector('.container_main-page')
	const rangeInput = document.querySelector('.main-page__input')
	const labelRangeInput = document.querySelector('.main-page__label')
	const mainSlider = document.querySelector('.main-page__slider')
	const anchorsLinks = document.querySelectorAll('a[href^="#"]')
	const btnUp = document.querySelector('.btn_up')
	const styles = ['main-page__range-start', 'main-page__range-middle', 'main-page__range-end']
	const bgForRange = ['main-page__container-start', 'main-page__container-middle', 'main-page__container-end']
	let scrolled
	let timer

	init()

	rangeInput.addEventListener('input', () => {
		labelRangeInput.textContent = `${rangeInput.value} / 3`

		toggleClass(styles)
		toggleClass(bgForRange)
	})

	function toggleClass (classes) {
		const currentClass = classes[rangeInput.value - 1]
		for (const nameClass of classes) {
			if (mainSlider.classList.contains(nameClass) && mainPage.classList.contains(nameClass)) {
				mainSlider.classList.remove(nameClass)
				mainPage.classList.remove(nameClass)
			}
		}
		mainSlider.classList.add(currentClass) 
		mainPage.classList.add(currentClass)
	}

	function scrollToElement () {
		for (const anchorLink of anchorsLinks) {
			anchorLink.addEventListener('click', (event) => {
				event.preventDefault()
				const currentLink = anchorLink.getAttribute('href').substring(1)
				const scrollToElement = document.getElementById(currentLink)
				scrollToElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
			})
		}
	}

	function scrollToHeader () {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 1300) {
				btnUp.classList.add('btn_up-active')
			} else
			btnUp.classList.remove('btn_up-active')
		})

		btnUp.addEventListener('click', () => {
			scrolled = window.scrollY
			scrollToUp()
		})
	}


	function scrollToUp () {
		if(scrolled > 0) {
			window.scrollTo(0, scrolled)
			scrolled = scrolled - 100
			timer = setTimeout(scrollToUp, 20)
		} else {
			clearTimeout()
			window.scrollTo(0, 0)
		}
	}

	function init() {
		scrollToElement ()
		scrollToHeader ()
	}
})

