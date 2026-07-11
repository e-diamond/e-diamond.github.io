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

We always measure a quantum system as being in just one of these eigenstates, though, up until measurement, it may exist in a **superposition** of eigenstates. If you don't know what a superposition is, then it's just the physics word for a linear combination. And if you don't know what a linear combination is, then it's just the maths word for a kind of addition. We usually call the current state of the quantum system $$\ket{\psi}$$, and we express its superposition like this:

$$\ket{\psi} = a\ket{0} + b\ket{1}$$

$$a$$ and $$b$$ here are numbers that represent the 'amount' of $$\ket{\psi}$$ that is in each of the $$\ket{0}$$ and $$\ket{1}$$ eigenstates. A property of quantum eigenstates is that they are always **orthogonal**. This means that they have no 'overlap': if $$\ket{\psi}$$ is 100% in state $$\ket{1}$$, that necessarily means it is 0% in state $$\ket{0}$$, and vice versa. This makes sense, as we only ever _measure_ a quantum system as being in a single eigenstate.

When $$\ket{\psi}$$ is in a superposition, however, it does have overlap with both $$\ket{0}$$ and $$\ket{1}$$, and $$a$$ and $$b$$ tell us the size of this overlap. Visually, you can think of this like the 'projection' of $$\ket{\psi}$$ onto $$\ket{0}$$ and $$\ket{1}$$. If $$\ket{\psi}$$ moves closer to $$\ket{0}$$, then its projection onto this axis will get larger, and its projection onto $$\ket{1}$$ will get smaller, and of course vice versa.

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

Mathematically, we can get the values of these projections $$a$$ and $$b$$ by performing the **inner product** of $$\ket{\psi}$$ with $$\ket{0}$$ and $$\ket{1}$$. If you haven't heard of the inner product before, you might have heard of the **dot product**, which is just a special case of the inner product. For the moment, I'm going to say that this distinction is unimportant (though it will come up again later on).

<!-- $$\braket{0 \mid \psi} = 0 \cdot \psi$$ -->

But what do a and b represent _physically_? Earlier, we said how a qubit can only ever be _measured_ as being in a single eigenstate. [The Born rule][born] is a postulate of quantum mechanics that says the **probability** of measuring $$\ket{\psi}$$ as being in a particular eigenstate is related to these values $$a$$ and $$b$$. Specifically, it's given by the size of these values squared:

Probability of measuring $$\ket{0} = \lvert a \rvert^{2}$$

Probability of measuring $$\ket{1} = \lvert b \rvert^{2}$$

This means that the 'closer' $$\ket{\psi}$$ is to $$\ket{0}$$ or $$\ket{1}$$, the **higher the probability** of measuring it in that state. Because of this, we call $$a$$ and $$b$$ **probability amplitudes**.

...But why probability _amplitudes_? I guess we can't just call them probabilities, because we have to do something to them first to get the probability out, but why _amplitudes_?

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