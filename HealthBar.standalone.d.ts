/// <reference path="phaser.d.ts" />

declare module "phaser-healthbar" {
    export = Healthbar;
}

/**
 * A healthbar with animations
 */
declare class Healthbar {
    /**
     * Creates a new healthbar instance
     * @param game A reference to a phaser game instance
     * @param config Defines the properties of the healthbar
     */
    constructor(game: Phaser.Game, config: Healthbar.Config);

    /**
     * Changes the percentage of the health. Health is defined in the config.
     * @param value The percentage can be from 0 - 100
     */
    setPercent(value: number): void;

    /**
     * Changes the position of the bar to the provided coordinates
     * @param x The position on the X axis
     * @param y The position on the Y axis
     */
    setPosition(x: number, y: number): void;

    /**
     * Changes the bar color. The bar is the part that display the health left.
     * @param newColor Use a hex color string, like `#fc9802`
     */
    setBarColor(newColor: string): void;

    /**
     * Makes the healthbar fixed to the camera and not to a coordinate
     * @param fixedToCamera 
     */
    setFixedToCamera(fixedToCamera: boolean): void;

    /**
     * Adds the bar to a group
     * @param group The group to which the healthbar will be added
     */
    setToGroup(group: Phaser.Group): void;

    /**
     * Removes bar from the current group and adds it back to `game.world` group
     */
    removeFromGroup(): void;

    /**
     * Will kill the healthbar and destroy its sprites
     */
    kill(): void;


    /**
     * Changes the position of the anchor of the sprite
     * @param x The position on the X axis
     * @param y The position on the Y axis
     */
    setAnchor(x: number, y: number): void;

    /**
     * Setup the configuration
     * @param providedConfig The config that has been provided
     */
    setupConfiguration(providedConfig: Healthbar.Config):void;

    /**
     * Merge a new config with the existing one
     * @param newConfig 
     */
    mergeWithDefaultConfiguration(newConfig: Healthbar.Config):void

}

declare module Healthbar {
    /**
     * Config for the Healthbar
     */
    interface Config {
        /**
         * The width of the health bar
         */
        width: number;
        /**
         * The height of the health bar
         */
        height: number;
        /**
         * The initial position of the healthbar on the X axis
         */
        x: number;
        /**
         * The initial position of the healthbar on the Y axis
         */
        y: number;
        /**
         * Object defining the background color of the healthbar
         */
        bg: {
            /**
             * Hex color string
             */
            color: string
        };
        /**
         * Object defining the color of the part, that displays the health in the healthbar
         */
        bar: {
            /**
             * Hex color string
             */
            color: string
        };
        /**
         * Duration of the animation, when the health value is changed.
         */
        animationDuration: number;
        /**
         * If true, then the bar will display the life starting from left to right.
         */
        flipped: boolean;
    }
}