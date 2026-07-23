---
title: "Quantum Computing and the Bloch Sphere"
libs:
    - mathjax
imports:
    p5: "https://cdn.jsdelivr.net/npm/p5@2.2.3/+esm"
scripts:
     - assets/posts/bloch-sphere/real-basis.js
     - assets/posts/bloch-sphere/complex-plane.js
     - assets/posts/bloch-sphere/bloch-sphere.js
---

In quantum computing, we have the concept of _qubits_. Qubits are analogous to classical bits in that they have two possible states, akin to the classical bit's **0** and **1**, though differ in the fact that, up until the moment of measurement, they can also exist in a superposition of these states.

<!-- more -->

## Classical Bits
Classical bits are simple. A bit can exist in one of two states: we often call these the **0** state, and the **1** state, though really we could call them anything. 0 and 1 might represent low voltage and high voltage in a circuit, an uncharged and charged capacitor, or any other system with two states. The use of 0 and 1 is just an abstraction of these physical objects.

## Qubits
Qubits can be measured as being in one of two **eigenstates**: we often call these the $$\ket{0}$$ state, and the $$\ket{1}$$ state, though really we could call them anything. $$\ket{0}$$ and $$\ket{1}$$ might represent the spin-up and spin-down state of an electron, the ground state and first excited state of a particle, or any other quantum system with two eigenstates. The use of $$\ket{0}$$ and $$\ket{1}$$ is just an abstraction of these physical systems.

You might be wondering why $$\ket{0}$$ and $$\ket{1}$$ are in those funny angle brackets. These are used to denote that $$\ket{0}$$ and $$\ket{1}$$ are **vectors**. Representing eigenstates as vectors is useful for a few reasons, one of which is because of a property of quantum systems known as **superposition**.

We always measure a quantum system as being in just one eigenstate, though, up until we interact with it, it may exist in a **superposition** of eigenstates. A superposition is a kind of combination of states. In fact, it's really just the physics word for a linear combination. If you don't know what a linear combination is, then it's just a way of adding vectors together. For example, we could create a new vector, let's call it $$\ket{\psi}$$, like this:

$$\ket{\psi} = a\ket{0} + b\ket{1}$$

and we would say that $$\ket{\psi}$$ is in a superposition of $$\ket{0}$$ and $$\ket{1}$$. $$a$$ and $$b$$ here represent the amount by which $$\ket{\psi}$$ points in either the $$\ket{0}$$ or $$\ket{1}$$ direction. For example, a large value for $$a$$ and a small value for $$b$$ would produce a vector that points mostly in the same direction as $$\ket{0}$$.

$$\ket{\psi}$$ is the symbol we normally give to the current state of a quantum system, so the equation above is how we represent our qubit being in a superposition of eigenstates. In the interaction below, you can see how the values of $$a$$ and $$b$$ change as we change the vector $$\ket{\psi}$$.

<figure id="real-basis">
    <figcaption>
        Move $$\ket{\psi}$$ around below to see how $$a$$ and $$b$$ change.
    </figcaption>
    <math class="real-basis">
        <mfenced open="|" close="〉">
            <mi>ψ</mi>
        </mfenced>

        <mo>=</mo>

        <mn id="co-a">a</mn>
        <mfenced open="|" close="〉">
            <mn>0</mn>
        </mfenced>

        <mo>+</mo>

        <mn id="co-b">b</mn>
        <mfenced open="|" close="〉">
            <mn>1</mn>
        </mfenced>    
    </math>
</figure>

From this interaction, we can see that we can think about $$a$$ and $$b$$ as the 'projection' of $$\ket{\psi}$$ onto $$\ket{0}$$ and $$\ket{1}$$. If you know some trigonometry, you'll notice that this means we can get the values of $$a$$ and $$b$$ by performing the **cosine** of the angle between $$\ket{\psi}$$ and $$\ket{0}$$ and $$\ket{1}$$ respectively. If you know some vector maths, you'll notice that this means we can get the values of $$a$$ and $$b$$ by performing the **dot product** of $$\ket{\psi}$$ with $$\ket{0}$$ and $$\ket{1}$$ respectively.
<!-- TODO: dot product/cosine. talk about braket notation?? -->

Something you'll notice is that when $$\ket{\psi}$$ is in an eigenstate (that is, when it lies entirely in either the $$\ket{0}$$ or $$\ket{1}$$ direction), its projection onto that state becomes 1, and its projection onto the other state becomes 0. Earlier, we said that a quantum system can only ever be measured as being in a single eigenstate, not a superposition, so this makes sense! If this weren't the case, then when $$\ket{\psi}$$ is in an eigenstate, its projection onto the other state would be **non-zero**, meaning it would still be in a superposition! A property of quantum eigenstates is that they are always **orthogonal**, which is what prevents this from happening. We say states are orthogonal when they have 0 projection onto each other, which is why $$\ket{0}$$ and $$\ket{1}$$ are drawn at right-angles to each other above.

Finally, you probably noticed that the values of $$a$$ and $$b$$ are never greater than 1. This is due to what $$a$$ and $$b$$ represent _physically_. We know that $$\ket{\psi}$$ must always collapse into an eigenstate upon measurement - $$a$$ and $$b$$ actually tell us the **probability** of $$\ket{\psi}$$ collapsing into either $$\ket{0}$$ or $$\ket{1}$$. This means that the 'closer' $$\ket{\psi}$$ is to $$\ket{0}$$ or $$\ket{1}$$, the **higher the probability** of measuring it in that state. [The Born rule][born] is a postulate of quantum mechanics that says that, specifically, the probability is given by the size of these values squared:

Probability of measuring $$\ket{0} = \lvert a \rvert^{2}$$

Probability of measuring $$\ket{1} = \lvert b \rvert^{2}$$

As total probabilities must always add up to 1, this means we have the following constraint on our system:

$$\lvert a \rvert^{2} + \lvert b \rvert^{2} = 1$$

This is why the state vector $$\ket{\psi}$$ always has a length of 1.

Because of their relation to probability, we call $$a$$ and $$b$$ **probability amplitudes**.

### The wavefunction

...But why _amplitudes_? I guess we can't just call them probabilities, because we have to do something to them first to get the probability out, but _amplitudes_?

If you've ever studied some quantum mechanics, you've probably met $$\psi$$ before, but you may not have met it as the state vector $$\ket{\psi}$$. In fact, most people are introduced to $$\psi$$ as the **wavefunction**, $$\psi(x)$$. As it's a function, we can plot it. It's important to note here that the function $$\psi(x)$$ and the vector $$\ket{\psi}$$ represent the same quantum state. This can be true due to the fact that **all functions are vectors**. The two representations are completely equivalent.

Exactly what the plot $$\psi(x)$$ looks like will be different depending on which physical system our qubit is constructed from, but, as you may have guessed from the name, they can look very wave-like!

![Wavefunction pictures here]()

So, the probability amplitudes are named from being literal amplitudes of a wavefunction.

![Wavefunction w amplitude???]()

### Adding Complexity

As total probabilities must sum to 1, we therefore also know that:

$$\lvert a \rvert^{2} + \lvert b \rvert^{2} = 1$$


## The Bloch Sphere

Qubit states are often depicted on the **Bloch sphere**, which I will show to you now:

<figure id="bloch-sphere">
    <figcaption>
        The Bloch Sphere
    </figcaption>
</figure>

Something you may notice about the Bloch sphere is that it is [almost, but not quite, entirely unlike](https://en.wikiquote.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy#Chapter_17) what I've just shown you. For a start, $$\ket{0}$$ and $$\ket{1}$$ lay on opposite ends of the same axis, which is quite strange. Shouldn't the orthogonal states be drawn, well, _orthogonally_? Also, our coordinate system is 3-dimensional now - where did the extra dimension come from?!

First, let's look at the dimensionality. The 2D picture we had above only works if $$a$$ and $$b$$ are **real numbers**; however, this is not generally the case. $$a$$ and $$b$$ are typically **complex numbers**, which means that $$\ket{\psi}$$ doesn't exist in the 2D real space ($$\mathbb{R}^2$$), but, in fact, in the 2D complex space ($$\mathbb{C}^2$$).

Complex numbers consist of two parts - a **real** part, and an **imaginary** part. Because of this, we can represent a single complex number by using two real numbers - one for each of these parts. One way of writing these complex numbers is in the form $$x + yi$$, where x is the real component, and y is the imaginary component.

<figure id="complex-plane">
    <figcaption>
        Explore where different complex numbers lay on the complex plane.
    </figcaption>
</figure>

This, in effect, makes a single complex number two-dimensional. A fancy maths way of saying this is that $$\mathbb{C}^1$$ is _isomorphic_ to $$\mathbb{R}^2$$ (_iso-_ meaning _same_, and _-morphic_ meaning _shape_).

So, this means that to represent a and b, two complex numbers, we need **four** real numbers, so whatever representation we use needs to be 4-dimensional.

But the Bloch sphere exists in 3 dimensions, so now instead of one too few dimensions, we have one too many! 

### Not all states are distinct 
The reason for this is that not all _mathematical_ states are _physically_ different from each other.

Rather than writing a complex number in the form x + yi, we could instead use an alternative form: $$re^{i\theta}$$. In this form, r is the distance from 0, and $$\theta$$ is the angle made with the positive x-axis. This means that our equation for $$\ket{\psi}$$ can be written like this:

$$\ket{\psi} = r_0e^{i\theta_0}\ket{0} + r_0e^{i\theta_1}\ket{1}$$

Using power rules, we can factor out $$e^{i\theta_0}$$, like this:

$$\ket{\psi} = e^{i\theta_0}(r_0\ket{0} + r_0e^{i(\theta_1 - \theta_0)}\ket{1})$$


[born]: https://en.wikipedia.org/wiki/Born_rule

<style>
    .real-basis {
        display: block;
        margin: 1rem;
        text-align: center;
        font-size: 1.5rem;
    }

    figure {
        margin: 2rem auto;
        border-left: 0.5rem solid var(--accent-color);
    }

    figure mjx-container[jax="CHTML"][display="true"] {
        display: inline;
    }
    figcaption {
        margin: 2rem;
        margin-left: 1rem;
        font-style: italic;
    }
    /* figcaption::before {
        content: url('assets/posts/bloch-sphere/touch.png');
        zoom: 20%;
        margin: 0 1rem;
        display: inline-block;
        vertical-align: middle;
    } */

    canvas {
        display: block;
        margin: 1rem auto;
    }
</style>