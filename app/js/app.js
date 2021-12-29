// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {
	const mainPage = document.querySelector('.container_main-page')
	const rangeInput = document.querySelector('.main-page__input')
	const labelRangeInput = document.querySelector('.main-page__label')
	const mainSlider = document.querySelector('.main-page__slider')
	const anchorsLinks = document.querySelectorAll('a[href^="#"]')
	const btnUp = document.querySelector('.btn_up')
	const styles = [48, -9, -60]
	let scrolled
	let timer

	rangeInput.value = 1
	labelRangeInput.textContent = `${rangeInput.value} / 3`
	
	rangeInput.addEventListener('input', () => {
		labelRangeInput.textContent = `${rangeInput.value} / 3`
		mainSlider.style.top = styles[rangeInput.value - 1]
		filterRange()
	})

	function filterRange() {
		switch (rangeInput.value) {
			case 1:
				mainPage.style.filter = 'grayscale(0)'
				break;
			case 2: 
				mainPage.style.filter = 'saturate(50%)'
				break;
			case 3:
				mainPage.style.filter = 'grayscale(1)'
				break;
		}
	}

	for (const anchorLink of anchorsLinks) {
    anchorLink.addEventListener('click', (event) => {
      event.preventDefault()
      const currentLink = anchorLink.getAttribute('href').substr(1)
      console.log(currentLink)
      const scrollToElement = document.getElementById(currentLink)
      scrollToElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

	window.addEventListener('scroll', () => {
		if (window.scrollY > 1300) {
			btnUp.classList.add('btn_up-active')
		} else
		btnUp.classList.remove('btn_up-active')
	})

	btnUp.addEventListener('click', () => {
		scrolled = window.pageYOffset
		scrollToUp()
	})


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
})
