"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from "@clerk/nextjs";
import {
    RocketIcon,
    PartyPopperIcon,
    PencilIcon,
    CheckIcon,
    XIcon,
    TargetIcon
} from
    'lucide-react';
import { useRouter } from "next/navigation";
import { API_BASE_URL } from '@/lib/api';

interface GoalData {
    exists: boolean;
    target?: number;
    current?: number;
    exceeded?: number;
    state?: "ACTIVE" | "ACHIEVED" | "SMASHED";
    expiresAt?: string;
}
interface GoalTrackerProps {
    goal: any;
}

const API_BASE = API_BASE_URL;

export default function GoalTracker({ goal }: GoalTrackerProps) {
    const router = useRouter();
    const [localGoal, setLocalGoal] = useState<GoalData | null>(null);
    const [customTarget, setCustomTarget] = useState(0);
    const [hasGoal, setHasGoal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');
    const [mounted, setMounted] = useState(false);
    const { user, isLoaded } = useUser();
    const userId = user?.id;

    const fetchGoal = async () => {
        const res = await fetch(`${API_BASE}/vendor/dashboard?userId=${userId}`);
        const data = await res.json();
        setLocalGoal(data.goal);
        setHasGoal(data.goal?.exists ?? false);
        setCustomTarget(data.goal?.target ?? 0);
    };
    
    useEffect(() => {
        if (!isLoaded || !userId) return;

        fetchGoal();
    }, [isLoaded, userId]);

    useEffect(() => {
        if (localGoal) {
            setHasGoal(localGoal.exists);
            setCustomTarget(localGoal.target || 0);
            setInputValue(String(localGoal.target || ""));
        }
    }, [localGoal]);

    useEffect(() => {
        if (!goal) return;

        setLocalGoal(goal);
        setHasGoal(goal.exists ?? false);
        setCustomTarget(goal.target ?? 0);
    }, [goal]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const current = localGoal?.current || 0;
    const target = customTarget || 0;
    const exceeded = localGoal?.exceeded || 0;
    const state = localGoal?.state;
    const isSmashed = state === "SMASHED";

    const percentage = target ? Math.round((current / target) * 100) : 0;
    const remaining = Math.max(target - current, 0);
    const isComplete = current >= target;

    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(percentage, 100) / 100 * circumference;



    // CREATE / UPDATE GOAL
    const saveGoal = async (val: number) => {
        const method = hasGoal ? "PATCH" : "POST";

        await fetch(`${API_BASE}/vendor/dashboard/goal`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                target: val,
            }),
        });

        await fetchGoal();
    };

    // DELETE GOAL
    const deleteGoal = async () => {
        await fetch(`${API_BASE}/vendor/dashboard/goal`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            }),
        });

        await fetchGoal();
    };

    const handleSave = async () => {
        const val = parseInt(inputValue, 10);

        if (isNaN(val) || val < 1) {
            setInputError("Enter number ≥ 1");
            return;
        }

        if (val > 9999) {
            setInputError("Max 9999");
            return;
        }

        await saveGoal(val);

        setIsEditing(false);
        setInputError("");
    };

    const handleCancel = () => {
        setInputValue(String(customTarget));
        setInputError("");
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSave();
        if (e.key === "Escape") handleCancel();
    };

    let daysLeft = 0;
    let isExpired = false;

    if (mounted && localGoal?.expiresAt) {
        const today = new Date();
        const expiresAtDate = new Date(localGoal.expiresAt);

        daysLeft = Math.ceil(
            (expiresAtDate.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        isExpired = daysLeft <= 0;
    }

    const isFinished = state === "ACHIEVED" || state === "SMASHED";

    const shouldSuggestExtend =
        isFinished && daysLeft > 2;

    const isEndingSoon =
        isFinished && daysLeft > 0 && daysLeft <= 2;

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
                        {!isExpired && (
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
                                    onClick={deleteGoal}
                                    className="goal-edit-button"
                                >
                                    <XIcon className="goal-edit-icon" />
                                    <span className="goal-edit-text">
                                        Delete Goal
                                    </span>
                                </motion.button>
                            </div>
                        )}
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
                                    stroke={
                                        isExpired
                                            ? "#666"
                                            : isSmashed
                                                ? "#FFD700"
                                                : isComplete
                                                    ? "#4db89e"
                                                    : "#379683"
                                    }
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
                            {isExpired && (
                                <>
                                    <p style={{ marginTop: 8, fontWeight: 600 }}>
                                        ⏳ Your 30-day goal period has ended.
                                    </p>

                                    <button
                                        onClick={async () => {
                                            await deleteGoal();
                                            setHasGoal(false);
                                            router.refresh();
                                        }}
                                        style={{
                                            padding: "4px 10px",
                                            borderRadius: 6,
                                            background: "rgba(255,255,255,0.08)",
                                            color: "white",
                                            border: "1px solid rgba(255,255,255,0.2)",
                                            fontSize: "0.8rem",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Start New Goal
                                    </button>
                                </>
                            )}
                            <motion.p
                                key={percentage}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="goal-status"
                            >
                                {isSmashed
                                    ? "🔥 Target Smashed!"
                                    : isComplete
                                        ? "🎉 Goal Achieved!"
                                        : `${percentage}% complete`}
                            </motion.p>
                            {isSmashed && (
                                <p style={{ color: "#FFD700", fontWeight: 600, marginTop: 6 }}>
                                    🚀 You exceeded your goal by {exceeded} bookings!
                                </p>
                            )}

                            {isFinished && !isExpired && (
                                <div className="goal-cta-card">

                                    <p className="goal-cta-title">
                                        {isSmashed ? "🔥 You crushed it!" : "🎉 Goal completed"}
                                    </p>

                                    <p className="goal-cta-sub">
                                        {daysLeft > 2
                                            ? `You still have ${daysLeft} days left this month. Push further or raise your target.`
                                            : `This goal ends in ${daysLeft} day${daysLeft === 1 ? "" : "s"}. Start fresh or extend now.`}
                                    </p>

                                    <div className="goal-cta-actions">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="goal-btn-primary"
                                        >
                                            Increase Target
                                        </button>

                                        {daysLeft <= 2 && (
                                            <button
                                                onClick={deleteGoal}
                                                className="goal-btn-secondary"
                                            >
                                                Start New Goal
                                            </button>
                                        )}
                                    </div>

                                </div>
                            )}

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
