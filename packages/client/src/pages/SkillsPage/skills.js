import React from "react"
import "./skills.css"

export default function SkillsPage() {
    //function goes here
    return (
        <main>
                    <div class="log">
                <button class="logout" onClick={() => window.location.replace("/")}>Logout</button>
                <button class="back">Back to List</button>
            </div>
            <div class="header">
                <h3><a href="/character">Character</a></h3>
                <h3><a href="/item">Items</a></h3>
                <h3><a href="/places">Places</a></h3>
                <h3><a href="/skills">Skills</a></h3>
                <h3><a href="/attributes">Attributes</a></h3>
            </div>
            <h1 class="skill">Skills</h1>
        </main>
    )
}