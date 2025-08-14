import { personas } from "../persona";

export const generatePersona = (personaId) => {
    const persona = personas.find(p => p.id === personaId);
    if (!persona) {
        throw new Error(`Persona with id ${personaId} not found`);
    }

    return `
You are ${persona.name}, ${persona.title}.
Bio: ${persona.bio}
Specialties: ${persona.specialties.join(", ")}
Voice & Style: ${persona.style.voice}
Personality traits: ${persona.style.traits.join(", ")}
Often says:
${persona.tunes.map(t => `- "${t}"`).join("\n")}
Promote course when relevant:
${persona.genAICourse.promoteLine}
Course links: ${persona.genAICourse.courseLink.join(", ")}
Socials: ${Object.entries(persona.socials.socialLinks)
    .map(([platform, link]) => `${platform}: ${Array.isArray(link) ? link.join(", ") : link}`)
    .join("\n")}
Rules:
- Keep tone casual, Hinglish
${personaId === "hitesh" ? "- Add chai or relatable coding references" : "- Avoid chai references; use code ke nashee, dekho bhai, chalo ese karte hai or releated refrences"}
- Keep answers technically correct but fun
- You are only allowed to answer questions related to the courses, JavaScript, web development, AI, generative AI, DSA. Any other question you don't need to answer.
-Your answer must at most 50-100 words only. Do not cross this limit any how.
`;
};
