// PROMPT: kalimat pembuka dan knowledge yang dikirim ke ChatGPT.
// Kalau teks knowledge mengandung tanda ` atau ${ atau \, tulis dengan garis miring di depannya: \` atau \${ atau \\
// (atau taruh knowledge di file .txt di folder ini, lihat data/_template/prompt.js).

export default {
  instruction: "",

  knowledge: `
# REALISTIC MASTER PROMPT

# GLOBAL STYLE PROMPT (apply to all cuts)

Pure environmental POV as if a modern smartphone is accidentally recording life inside **[MAIN WORLD / SETTING / ERA]**, **[HISTORICAL OR WORLD CONTEXT]**, grounded and realistic according to the chosen theme.

No visible narrator, no voice-over, no subtitles, no captions, no on-screen text—only raw ambient environmental sound.

The world should feel socially alive whenever appropriate:

- Natural background chatter
- Casual conversations
- Murmurs
- Brief reactions
- Laughter
- Short calls
- Overlapping voices
- Breathing
- Movement noise
- Unscripted human presence

People should never feel unnaturally silent unless the scene specifically requires silence.

### Camera Characteristics

- Handheld smartphone
- Unstable movement
- Imperfect framing
- Off-center composition
- Occasional finger entering frame
- Motion blur
- Soft focus misses
- Light grain
- Natural lighting
- Slight highlight bloom from bright sky, fire, water, reflective surfaces, pale materials, or strong light sources
- Autofocus hunts unpredictably

### Avoid

- Cinematic smoothness
- Clean composition
- Perfect gimbal movement
- Polished lighting
- Intentional framing

Tone should feel **[TONE]** and alive—like rediscovered lost footage from another time or place.

The video should feel like amateur handheld B-roll accidentally captured while wandering through **[SPECIFIC LOCATION / ACTIVITY / COMMUNITY]**.

---

# CAMERA MOVEMENT STYLE PROMPT (apply to all cuts)

The camera behaves like a real person casually holding a modern smartphone while walking—not like a professional camera operator.

Movement should feel accidental, reactive, and imperfect:

- Short unstable walking motion
- Footstep bounce
- Tiny hand tremors
- Hesitant starts and stops
- Slight wrist rotations
- Late reactions to subjects
- Imperfect follow-through after pans
- Small framing corrections that happen too late

Every cut should include at least one amateur flaw:

- Shaky entry
- Crooked horizon
- Too-close framing
- Partial body crop
- Missed focus
- Focus hunting
- Motion blur
- Brief obstruction
- Accidental downward tilt
- Overcorrection
- Exposure pumping

The camera should frequently become physically crowded by the environment:

- Shoulders
- Fur cloaks
- Shields
- Axe handles
- Rope
- Smoke
- Wooden posts
- Passing warriors
- Animals
- Wet surfaces

Focus should breathe as the phone shifts between foreground objects and background activity.

### Never Use

- Smooth dolly
- Crane
- Drone
- Tripod
- Locked-off framing
- Perfect gimbal stabilization
- Cinematic orbit shots
- Slow dramatic push-ins
- Symmetrical hero framing
- Perfect centered tracking

---

# EXTREME AMATEUR CAMERA DEGRADATION RULES (apply throughout)

The footage must look noticeably flawed and casually captured, as if recorded by an untrained person who is distracted, walking, reacting late, and not trying to compose shots well.

### Phone Position

- Too low
- Too close
- At the wrong angle

### Subjects Frequently

- Clipped
- Partially missed
- Blocked by nearby bodies
- Hidden behind shields
- Hidden behind axe handles
- Hidden behind ropes
- Hidden behind smoke
- Hidden behind wooden beams
- Hidden behind barrels
- Hidden behind objects passing close to the lens

### Operator Behavior

- Starts recording too late
- Turns too early
- Misses important actions
- Ends shots imperfectly

### Framing Mistakes

- Awkward headroom
- Empty space in the wrong part of frame
- Accidental downward tilt to mud or boots
- Subject drifting out of frame
- Late correction after movement
- Overcorrection after pan
- Clumsy attempts to follow motion

### Autofocus

- Fail
- Breathe
- Snap to the wrong object
- Recover imperfectly

### Exposure Changes

- Pale sky enters frame
- Fire appears
- Reflective metal appears
- Wet wood appears
- Water appears

### Texture

- Slightly messy
- Mild motion blur
- Subtle lens dirt
- Lens smear
- Occasional soft edges
- Unstable handheld jitter
- Footstep bounce
- Brief occlusion
- Accidental micro-zoom
- Uneven shot energy between cuts

### Avoid

- Professional intent
- Polish
- Balance
- Cinematic rhythm
- Beautiful shot design

---

# ANTI-AI / ANTI-CINEMATIC RULES (apply throughout)

Do NOT make the footage:

- Elegant
- Heroic
- Painterly
- Symmetrical
- Dramatic
- Glossy
- Visually perfected

Do NOT compose shots like:

- Films
- Trailers
- Documentary crews
- Travel commercials

Do NOT:

- Keep subjects centered for too long
- Make camera motion smooth or stabilized
- Create intentional lighting
- Make every shot equally strong

Some shots should naturally feel:

- Awkward
- Late
- Messy
- Partially blocked
- Imperfect

---

# CAMERA IMPERFECTION RULES (apply throughout)

Include visible imperfections such as:

- Quick shaky starts
- Too-close framing
- Bodies partially cut off
- Awkward downward angles
- Autofocus hunting
- Shaky side pans
- Slightly off-frame subjects
- Motion blur
- Awkward zoom-ins
- Missed focus
- Tilted horizon
- Soft blurred edges
- Slight lens smear
- Brief finger entering frame
- Heavy walking shake
- Accidental zooms
- Focus drifting
- Subtle trembling
- Focus breathing
- Slight highlight overexposure

---

# END NOTE

This instruction sheet applies to video generation.

## Requirements

- No visible narrator
- No voice-over
- No subtitles
- No captions
- No visible labels
- No logos
- No on-screen text unless explicitly requested

Use only raw ambient environmental sound.

The world should never feel eWhenever appropriate, include:

- Background chatter
- Casual conversation
- Murmurs
- Short calls
- Laughter
- Brief reactions
- Breathing
- Footsteps
- Group noise
- Overlapping voices

Human presence should always feel incidental and unscripted, never performed.

Keep imperfections visible and strong:

- Missed focus
- Wrong focus target
- Uneven exposure
- Accidental framing
- Motion blur
- Soft focus
- Unstable amateur handheld movement
- Partial occlusion
- Awkward timing
- Late reaction
- Messy physical camera presence
- Imperfect shot endings

The generated video should ultimately feel spontaneous, flawed, socially alive, non-cinematic, and accidentally captured on a modern smartphone inside **[MAIN WORLD / SETTING]**.
`,
};
