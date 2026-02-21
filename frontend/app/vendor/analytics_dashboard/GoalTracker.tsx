"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RocketIcon,
    PartyPopperIcon,
    PencilIcon,
    CheckIcon,
    XIcon,
    TargetIcon
} from
    'lucide-react';
import { GoalData } from './datas';
interface GoalTrackerProps {
    goal: GoalData;
}
const STORAGE_KEY = 'ayubowan_goal_target';
const STORAGE_EXISTS_KEY = 'ayubowan_goal_exists';
export default function GoalTracker({ goal }: GoalTrackerProps) {
    const [customTarget, setCustomTarget] = useState<number>(goal.target);
    const [hasGoal, setHasGoal] = useState(false);
    useEffect(() => {
        const exists = localStorage.getItem(STORAGE_EXISTS_KEY);
        const saved = localStorage.getItem(STORAGE_KEY);

        if (exists === 'true' && saved) {
            setHasGoal(true);
            setCustomTarget(parseInt(saved, 10));
        } else {
            setHasGoal(false);
        }
    }, []);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(String(customTarget));
    const [inputError, setInputError] = useState('');
    const current = goal.current;
    const target = customTarget;
    const percentage = Math.round(current / target * 100);
    const remaining = Math.max(target - current, 0);
    const isComplete = current >= target;
    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(percentage, 100) / 100 * circumference;
    const handleSave = () => {
        const val = parseInt(inputValue, 10);

        if (isNaN(val) || val < 1) {
            setInputError('Enter a number ≥ 1');
            return;
        }
        if (val > 9999) {
            setInputError('Max 9999');
            return;
        }
        setCustomTarget(val);
        localStorage.setItem(STORAGE_KEY, String(val));
        localStorage.setItem(STORAGE_EXISTS_KEY, 'true');
        setHasGoal(true);
        setIsEditing(false);
        setInputError('');
    };
    const handleCancel = () => {
        setInputValue(String(customTarget));
        setInputError('');
        setIsEditing(false);
    };
    const handleDelete = () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_EXISTS_KEY);
        setHasGoal(false);
        setIsEditing(false);
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') handleCancel();
    };
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 16
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                delay: 0.3
            }}
            className="goal-container">
            {!hasGoal && (
                <div className="goal-empty">

                    <div className="goal-empty-icon">
                        <TargetIcon size={42} />
                    </div>

                    <h3 className="goal-empty-title">
                        Create your first monthly goal
                    </h3>

                    <p className="goal-empty-sub">
                        Set a booking target and start turning views into real customers 🚀
                    </p>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="goal-empty-btn"
                    >
                        Create Goal
                    </button>

                </div>
            )}
            {/* EDIT FORM (shared for create + edit) */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25 }}
                        className="goal-edit-form"
                    >
                        <div className="goal-form-header">
                            <TargetIcon className="goal-form-icon" />
                            <p className="goal-form-title">Set your booking target</p>
                        </div>

                        <p className="goal-form-description">
                            How many bookings do you want to reach this month?
                        </p>

                        <div className="goal-form-inputs">
                            <div className="goal-form-input-wrapper">
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        setInputError("");
                                    }}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                    min={1}
                                    max={9999}
                                    placeholder="e.g. 50"
                                    className="goal-form-input"
                                />

                                {inputError && <p className="goal-form-error">{inputError}</p>}
                            </div>

                            <button onClick={handleSave} className="goal-form-save">
                                <CheckIcon className="goal-form-save-icon" />
                                Save
                            </button>

                            <button onClick={handleCancel} className="goal-form-cancel">
                                <XIcon className="goal-form-cancel-icon" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Header row */}
            {hasGoal && (
                <>
                    <div className="goal-header">
                        <div>
                            <p className="goal-label">
                                Monthly Goal
                            </p>
                        </div>
                        <div className="goal-actions">
                            <motion.button
                                whileTap={{
                                    scale: 0.95
                                }}
                                onClick={() => {
                                    setInputValue(String(customTarget));
                                    setIsEditing(true);
                                }}
                                className="goal-edit-button">

                                <PencilIcon className="goal-edit-icon" />
                                <span className="goal-edit-text">
                                    Edit Goal
                                </span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDelete}
                                className="goal-edit-button"
                            >
                                <XIcon className="goal-edit-icon" />
                                <span className="goal-edit-text">
                                    Delete Goal
                                </span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="goal-main">
                        {/* Ring */}
                        <div
                            className="goal-ring-container"
                            style={{
                                width: size,
                                height: size
                            }}>

                            <svg width={size} height={size} className="goal-ring-svg">
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.08)"
                                    strokeWidth={strokeWidth} />

                                <motion.circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    fill="none"
                                    stroke={isComplete ? '#4db89e' : '#379683'}
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    initial={{
                                        strokeDashoffset: circumference
                                    }}
                                    animate={{
                                        strokeDashoffset: circumference - progress
                                    }}
                                    transition={{
                                        delay: 0.5,
                                        duration: 1.2,
                                        ease: 'easeOut'
                                    }} />

                            </svg>
                            <div className="goal-ring-center">
                                <span className="goal-ring-value">
                                    {current}
                                </span>
                                <span className="goal-ring-max">/ {target}</span>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="goal-text">
                            <motion.p
                                key={percentage}
                                initial={{
                                    opacity: 0,
                                    y: -4
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                className="goal-status">

                                {isComplete ? '🎉 Goal Achieved!' : `${percentage}% complete`}
                            </motion.p>
                            <p className="goal-description">
                                {isComplete ?
                                    'Congratulations, you hit your target!' :

                                    <>
                                        <span className="goal-description-highlight">
                                            {remaining} more bookings
                                        </span>{' '}
                                        to reach your goal
                                    </>
                                }
                            </p>

                            {/* Progress bar */}
                            <div className="goal-progress-bar">
                                <motion.div
                                    key={target}
                                    initial={{
                                        width: 0
                                    }}
                                    animate={{
                                        width: `${Math.min(percentage, 100)}%`
                                    }}
                                    transition={{
                                        delay: 0.6,
                                        duration: 1,
                                        ease: 'easeOut'
                                    }}
                                    className="goal-progress-fill" />

                            </div>
                            <div className="goal-progress-labels">
                                <span className="goal-progress-label">0</span>
                                <span className="goal-progress-label">{target} target</span>
                            </div>
                        </div>

                        {/* Icon */}
                        <div className="goal-icon-container">
                            {isComplete ?
                                <PartyPopperIcon className="goal-icon" /> :

                                <RocketIcon className="goal-icon" />
                            }
                        </div>
                    </div>
                </>
            )}
        </motion.div>);

}
