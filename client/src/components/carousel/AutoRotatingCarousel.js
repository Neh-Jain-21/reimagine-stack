/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@mui/styles/withStyles";
import Dots from "src/components/carousel/Dots";
import SwipeableCarousel from "./SwipableCarouselView";
import { modulo } from "./util";

const styles = {
    root: {
        "& > *:focus": {
            outline: "none",
        },
    },
    content: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    dots: {
        margin: "0 auto",
    },
    footer: {
        paddingBottom: "50px",
        textAlign: "center",
    },
    slide: {
        width: "100%",
        height: "100%",
    },
    carousel: {
        height: "100%",
    },
};

class Carousel extends Component {
    state = {
        slideIndex: 0,
    };

    handleContentClick = (e) => e.stopPropagation() || e.preventDefault();

    handleChange = (slideIndex) => {
        this.setState(
            {
                slideIndex,
            },
            this.onChange(slideIndex)
        );
    };

    decreaseIndex() {
        const slideIndex = this.state.slideIndex - 1;
        this.setState(
            {
                slideIndex,
            },
            this.onChange(slideIndex)
        );
    }

    increaseIndex() {
        const slideIndex = this.state.slideIndex + 1;
        this.setState(
            {
                slideIndex,
            },
            this.onChange(slideIndex)
        );
    }

    onChange(slideIndex) {
        if (this.props.onChange) {
            this.props.onChange(modulo(slideIndex, this.props.children.length));
        }
    }

    render() {
        const { autoplay, children, classes, containerStyle, interval, open } =
            this.props;

        const hasMultipleChildren = children.length != null;

        return (
            <div className={classes.content} onClick={this.handleContentClick}>
                <SwipeableCarousel
                    autoplay={open && autoplay && hasMultipleChildren}
                    className={classes.carousel}
                    containerStyle={{ height: "100%", ...containerStyle }}
                    index={this.state.slideIndex}
                    interval={interval}
                    onChangeIndex={this.handleChange}
                    slideClassName={classes.slide}
                >
                    {React.Children.map(children, (c) => React.cloneElement(c))}
                </SwipeableCarousel>
                <div className={classes.footer}>
                    {hasMultipleChildren && (
                        <Dots
                            count={children.length}
                            index={modulo(
                                this.state.slideIndex,
                                children.length
                            )}
                            className={classes.dots}
                            onDotClick={this.handleChange}
                        />
                    )}
                </div>
            </div>
        );
    }
}

Carousel.defaultProps = {
    autoplay: true,
    interval: 3000,
    open: false,
};

Carousel.propTypes = {
    /** If `false`, the auto play behavior is disabled. */
    autoplay: PropTypes.bool,
    /** Properties applied to the [Button](https://material-ui.com/api/button/) element. */
    ButtonProps: PropTypes.object,
    /** Object for customizing the CSS classes. */
    classes: PropTypes.object.isRequired,
    /** Override the inline-styles of the carousel container. */
    containerStyle: PropTypes.object,
    /** Delay between auto play transitions (in ms). */
    interval: PropTypes.number,
    /** Properties applied to the [Modal](https://material-ui.com/api/modal/) element. */
    ModalProps: PropTypes.object,
    /** Fired when the index changed. Returns current index. */
    onChange: PropTypes.func,
    /** Fired when the gray background of the popup is pressed when it is open. */
    onClose: PropTypes.func,
    /** Fired when the user clicks the getting started button. */
    onStart: PropTypes.func,
    /** Controls whether the AutoRotatingCarousel is opened or not. */
    open: PropTypes.bool,
};

export default withStyles(styles)(Carousel);
