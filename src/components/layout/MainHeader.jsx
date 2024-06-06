import React from "react"
import {Button, Carousel} from "react-bootstrap"

const MainHeader = () => {
	return (
		<Carousel data-bs-theme="dark">
			<Carousel.Item>
				<img
					className="d-block w-100 carousel_img"
					src="./src/assets/images/slide_1.jpg"
					alt="First slide"
				/>
				<Carousel.Caption>
					<h1 className="carousel_h1">
						Welcome to <span className="hotel-color">Hotel</span>
					</h1>
					<h4 className="carousel_h4">Experience the Best Hospitality in Town</h4>
				</Carousel.Caption>
      		</Carousel.Item>
      		<Carousel.Item>
				<img
					className="d-block w-100 carousel_img"
					src="./src/assets/images/slide_2.jpg"
					alt="Second slide"
				/>
        		<Carousel.Caption>
					<h1 className="carousel_h1">
						Welcome to <span className="hotel-color">Hotel</span>
					</h1>
					<h4 className="carousel_h4">Experience the Best Hospitality in Town</h4>
        		</Carousel.Caption>
      		</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100 carousel_img"
					src="./src/assets/images/slide_3.jpg"
					alt="Third slide"
				/>
				<Carousel.Caption>
					<h1 className="carousel_h1" >
						Welcome to <span className="hotel-color">Hotel</span>
					</h1>
					<h4 className="carousel_h4">Experience the Best Hospitality in Town</h4>
				</Carousel.Caption>
			</Carousel.Item>
    	</Carousel>
	)
}

export default MainHeader