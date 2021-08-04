import React from 'react'
import { Image } from 'react-bootstrap'
import blackBg from '../../assets/images/38119.jpg'
import cardBg from '../../assets/images/card-bg.jpg'

export const IsImageNull = ({ inputImage, className = '', blackBackground = false}) => {
	const isImageNullFn = img => {
		let str = img.substr(img.length - 4)
		if (str === 'null') {
			return true
		} else {
			return false
		}
	}

	return (
		<>
			{isImageNullFn(inputImage) ? (
				<Image fluid rounded src={blackBackground ? blackBg : cardBg} alt='' className={className}/>
			) : (
				<Image fluid rounded src={inputImage} alt=''  className={className}/>
			)}
		</>
	)
}
