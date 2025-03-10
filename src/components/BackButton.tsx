import { useNavigate } from "react-router-dom"
import ArrowLeft from "../assets/arrow-left-icon.svg?react";

export function BackButton() {
    const navigate = useNavigate();
    return (
        <button type="button" className="btn-with-icon btn-back" onClick={() => navigate(-1)}>
            <ArrowLeft />
            Back
        </button>
    );
}