/**
 * Motion animation library for Sparez
 * Provides animation utilities for page transitions and UI elements
 */

// Simple motion animation library inspired by Framer Motion
class Motion {
    constructor() {
        this.animations = new Map();
    }

    // Create an animated element
    createAnimatedElement(options) {
        const element = document.createElement('div');
        
        // Apply initial styles
        if (options.style) {
            Object.assign(element.style, options.style);
        }
        
        // Set up animation
        if (options.animate) {
            this.animate(element, options.animate, options.transition || {});
        }
        
        return element;
    }
    
    // Animate an element with keyframes
    animate(element, keyframes, transition = {}) {
        const {
            duration = 2,
            ease = 'ease-in-out',
            times = null,
            repeat = 0,
            repeatDelay = 0
        } = transition;
        
        // Create animation ID
        const animationId = Math.random().toString(36).substring(2, 9);
        
        // Build keyframes array
        const keyframeEffects = [];
        
        // Process scale
        if (keyframes.scale) {
            const scaleFrames = Array.isArray(keyframes.scale) ? keyframes.scale : [keyframes.scale];
            scaleFrames.forEach((scale, i) => {
                if (!keyframeEffects[i]) keyframeEffects[i] = {};
                keyframeEffects[i].transform = `${keyframeEffects[i]?.transform || ''} scale(${scale})`.trim();
            });
        }
        
        // Process rotate
        if (keyframes.rotate) {
            const rotateFrames = Array.isArray(keyframes.rotate) ? keyframes.rotate : [keyframes.rotate];
            rotateFrames.forEach((rotate, i) => {
                if (!keyframeEffects[i]) keyframeEffects[i] = {};
                keyframeEffects[i].transform = `${keyframeEffects[i]?.transform || ''} rotate(${rotate}deg)`.trim();
            });
        }
        
        // Process borderRadius
        if (keyframes.borderRadius) {
            const radiusFrames = Array.isArray(keyframes.borderRadius) ? keyframes.borderRadius : [keyframes.borderRadius];
            radiusFrames.forEach((radius, i) => {
                if (!keyframeEffects[i]) keyframeEffects[i] = {};
                keyframeEffects[i].borderRadius = radius;
            });
        }
        
        // Process backgroundColor
        if (keyframes.backgroundColor) {
            const colorFrames = Array.isArray(keyframes.backgroundColor) ? keyframes.backgroundColor : [keyframes.backgroundColor];
            colorFrames.forEach((color, i) => {
                if (!keyframeEffects[i]) keyframeEffects[i] = {};
                keyframeEffects[i].backgroundColor = color;
            });
        }
        
        // Create animation options
        const animationOptions = {
            duration: duration * 1000, // Convert to milliseconds
            easing: ease,
            iterations: repeat === Infinity ? Infinity : repeat + 1,
            delay: 0,
            endDelay: repeatDelay * 1000, // Convert to milliseconds
            fill: 'forwards'
        };
        
        // Apply timing if provided
        if (times && Array.isArray(times) && times.length === keyframeEffects.length) {
            keyframeEffects.forEach((frame, i) => {
                frame.offset = times[i];
            });
        }
        
        // Create and start the animation
        const animation = element.animate(keyframeEffects, animationOptions);
        
        // Store animation reference
        this.animations.set(animationId, animation);
        
        return animationId;
    }
    
    // Stop an animation
    stop(animationId) {
        if (this.animations.has(animationId)) {
            const animation = this.animations.get(animationId);
            animation.cancel();
            this.animations.delete(animationId);
        }
    }
}

// Export singleton instance
window.motion = new Motion();
