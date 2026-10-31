---
title: dfg
description: dfgh
---

# Comprehensive AI, LLM & Production Engineering Curriculum

A rigorous, first-principles-to-production roadmap integrating mathematical foundations, PyTorch 2.x mechanics, frontier LLM architectures, and real-world AI Engineering interview design patterns.

---

## Phase 1: Mathematical Foundations & Core AI Intuitions

_Objective: Formulate deep geometric and analytical intuition for high-dimensional vector spaces and optimization._

### Core Modules

- **AI Basics & Vocabulary**
  - **The Field Map:** AI vs. Machine Learning vs. Deep Learning, NLP, Computer Vision, Generative AI, and LLMs.
  - **Data, Models & Training:** Features, labels, data splits, kinds of learning, parameters vs. hyperparameters, the training loop, batches, epochs, and overfitting.
  - **Language to Vectors:** Corpus, tokens, vocabulary, embeddings, and static (GloVe) vs. contextual (BERT) embeddings.
- **Linear Algebra & Vector Spaces**
  - **Vectors:** Unit vectors, basis vectors, dimensionality, and geometric representations.
  - **Matrices:** Linear transformations, rank, invertibility, and matrix factorizations (SVD, Eigen-decomposition).
  - **Similarity with Dot Product:** Projections, inner products, and measuring semantic alignment via Cosine Similarity (and why unit-normalized vectors reduce cosine similarity to a fast dot product).
  - **L1 vs. L2 Norms:** Manhattan ($L_1$) vs. Euclidean ($L_2$) distance, sparsity incentives (Lasso), and weight decay regularization (Ridge).
- **Multivariate Calculus & Optimization**
  - **Derivatives:** Instantaneous rates of change and partial derivatives.
  - **Derivation Rules and Examples:** Chain rule, product rule, and quotient rule applied across nested composite functions.
  - **Gradients:** Jacobian vectors, directional derivatives, steepness in multidimensional loss landscapes, and local minima vs. saddle points.
- **Probabilistic & Array Mechanics**
  - **Tensor Broadcasting:** Implicit dimension expansion rules, stride tricks, and memory-efficient vectorization.
  - **Softmax Probabilities & Logits `[INTERVIEW-CORE]`:** How raw unnormalized model scores (logits) map to probability distributions, temperature scaling, and numerical stability (the log-sum-exp trick).
  - **Information Theory & Loss Functions:** Entropy, Cross-Entropy Loss, Kullback-Leibler (KL) Divergence, and Perplexity.
- **Algorithmic Implementation**
  - **Backprop in Python:** Constructing a directed acyclic computational graph (DAG) and reverse-mode automatic differentiation from scratch using pure Python/NumPy.

### Canonical Resources

- **Repositories:**
  - [`karpathy/micrograd`](https://github.com/karpathy/micrograd) — Tiny scalar-valued autograd engine and neural net library.
- **Lectures & Guides:**
  - 3Blue1Brown: _Essence of Linear Algebra_ & _Essence of Calculus_ (YouTube).
  - Andrej Karpathy: _The spelled-out intro to neural networks and backpropagation: building micrograd_ (YouTube).
  - Outcome School: _Understanding Logits in Machine Learning_ & _Embeddings in Machine Learning_ (`outcomeschool.com/blog`).
  - Book: _Mathematics for Machine Learning_ (Deisenroth, Faisal, Ong) — Free PDF (`mml-book.github.io`).

---

## Phase 2: Deep Learning Frameworks & Tensor Mechanics (PyTorch 2.x Stack)

_Objective: Translate mathematical arrays into GPU-accelerated computational graphs and high-throughput data pipelines._

### Core Modules

- **PyTorch Basics**
  - **The Framework Map:** What a deep learning framework adds to NumPy, PyTorch vs. TensorFlow, Keras, and JAX, eager vs. compiled execution, and why training runs on GPUs.
  - **The Five Building Blocks:** Tensor, autograd, `nn.Module`, optimizer, and `DataLoader`, assembled into a complete tiny training run.
- **PyTorch Tensor Fundamentals**
  - **Creating Tensors:** Data types (`float32`, `float16`, `bfloat16`, `int8`), device allocation, and memory layout (strides and contiguity).
  - **Special Tensors:** Identity (`eye`), uniform/normal distributions (`rand`, `randn`), and sequence builders (`arange`, `linspace`).
  - **Indexing and Slicing:** Boolean masking, fancy indexing, and zero-copy strided views.
  - **Shape Manipulation:** `flatten`, `reshape`, `view` (contiguous vs. non-contiguous memory allocation), `squeeze`, and `unsqueeze`.
  - **Combining & Permuting:** `cat`, `stack`, and **Transposing Tensors** (`transpose`, `permute`, and declarative `einops` operations).
  - **Matrix Multiplication:** Element-wise Hadamard products (`*`) vs. batched matrix multiplication (`@`, `torch.matmul`, `torch.bmm`, `torch.einsum`).
- **Runtime Execution, Serialization & Data Pipelines**
  - **GPU vs. CPU Execution `[INTERVIEW-CORE]`:** Device placement (`.to('cuda')`), pinned host memory, numerical stability trade-offs between `FP32`, `FP16` (underflow/overflow requiring loss scaling), and `BF16` (preserving FP32 dynamic exponent range), plus `torch.compile`.
  - **PyTorch Autograd Engine:** Dynamic graph tracking (`requires_grad`), `.backward()`, gradient accumulation, and `torch.no_grad()`.
  - **Simple Linear Model:** Implementing the canonical 5-step PyTorch training and validation harness (`nn.Module`).
  - **High-Throughput Data Pipelines _(replaces TFRecords/Dataset API)_:** Custom `Dataset` classes, multi-worker `DataLoader` prefetching, and sharded streaming via **WebDataset**.
  - **Save and Restore:** Checkpointing model/optimizer `state_dict` and secure zero-copy weight serialization with **Safetensors**.
  - **Cross-Framework Literacy _(1-Day Primer)_:** Understanding **Keras 3** multi-backend workflows and inspecting legacy TensorFlow `SavedModel` files.

### Canonical Resources

- **Repositories:**
  - [`pytorch/examples`](https://github.com/pytorch/examples) & [`pytorch/tutorials`](https://github.com/pytorch/tutorials) — Official PyTorch reference code.
  - [`arogozhnikov/einops`](https://github.com/arogozhnikov/einops) — Flexible and powerful tensor operations for readable deep learning code.
  - [`huggingface/safetensors`](https://github.com/huggingface/safetensors) — Fast, safe tensor serialization format.
- **Lectures & Guides:**
  - Jeremy Howard: _Practical Deep Learning for Coders_ (`course.fast.ai`).
  - PyTorch Official Docs: _Automatic Mixed Precision (AMP) & TorchInductor Compilation_.

---

## Phase 3: Neural Networks from Scratch & Optimization Dynamics

_Objective: Strip away framework abstractions to build forward passes, normalization layers, and adaptive optimizers from raw math._

### Core Modules

- **Neural Network Basics**
  - **The Big Picture:** What a neural network is, the perceptron and the XOR problem, input/hidden/output layers, width and depth, counting parameters, and universal approximation.
  - **Why Depth Is Hard:** The vanishing/exploding signal, saturation, and optimization problems that the rest of the phase solves.
- **Architecture Primitives**
  - **Single Neuron from Scratch:** Affine transformations ($z = Wx + b$) and non-linear activations (`ReLU`, `GELU`, `SiLU`/`SwiGLU`).
  - **Building a Layer:** Vectorized dense layers and variance-preserving weight initializations (Xavier/Glorot, He/Kaiming).
  - **Implementing a Network:** Multi-layer perceptrons (MLPs), caching forward activations, and computing analytical backward gradients.
- **Training Dynamics, Normalization & Optimizers**
  - **BatchNorm vs. LayerNorm:** Mitigating internal covariate shift; why LayerNorm dominates sequence models over BatchNorm.
  - **RMSNorm:** Root Mean Square Layer Normalization—dispensing with mean-centering for computational speed in modern LLMs.
  - **Learning Rate & Decay:** Linear warmup phases, step decay, and Cosine Annealing schedules.
  - **Adam & AdamW Optimizer:** First and second moment estimation (momentum + adaptive step sizes) and decoupled weight decay.
  - **Hyper-Parameter Optimization:** Grid search, random search, and Bayesian pruning (Optuna / Ray Tune).

### Canonical Resources

- **Repositories:**
  - [`karpathy/makemore`](https://github.com/karpathy/makemore) — Building MLPs, BatchNorm, and backprop step-by-step from scratch.
  - [`optuna/optuna`](https://github.com/optuna/optuna) — Next-generation hyperparameter optimization framework.
- **Lectures & Guides:**
  - Andrej Karpathy: _Neural Networks: Zero to Hero (Parts 2–4: Makemore, Activations, Gradients, BatchNorm)_ (YouTube).
  - Paper: _Root Mean Square Layer Normalization_ (Zhang & Sennrich, arXiv:1910.07467).
  - Paper: _Decoupled Weight Decay Regularization (AdamW)_ (Loshchilov & Hutter, arXiv:1711.05101).

---

## Phase 4: Classical Deep Learning — Vision, Interpretability & Sequences

_Objective: Master spatial convolutions, recurrent memory, internal activation auditing, and input-gradient manipulation._

### Core Modules

- **Vision & Sequence Basics**
  - **Data as Tensors:** Pixels, channels, and the $(B, C, H, W)$ layout; text, audio, and time series as $(B, T, F)$ sequences.
  - **The Field Map:** Computer vision and NLP tasks (classification, detection, segmentation, translation), standard datasets (MNIST, CIFAR-10, ImageNet), inductive bias, and the CNN, RNN, and transformer families.
- **Convolutional Architectures & Computer Vision**
  - **CNNs:** Spatial filters/kernels, stride, padding, pooling, and receptive field progression.
  - **CIFAR-10 Classification Pipeline:** End-to-end training with data augmentation (`torchvision.transforms.v2`) and Residual Connections (ResNet).
  - **Inception & Multi-Scale Models:** $1 \times 1$ point-wise convolutions and navigating the `timm` (PyTorch Image Models) library.
  - **Transfer Learning & Fine-Tuning:** Freezing backbone feature extractors (`requires_grad = False`) and adapting task heads.
  - **Ensemble Learning:** Combining predictions via logit averaging, bagging, and vectorized evaluation (`torch.func.vmap`).
  - **Video Data:** Spatiotemporal 5D tensors $(B, C, T, H, W)$ and 3D convolutional processing.
- **Model Interpretability, Adversarial Robustness & Generative Vision**
  - **Visual Analysis (MNIST & CNNs):** Using PyTorch **Forward/Backward Hooks** (`register_forward_hook`) to inspect feature maps, saliency maps, and Grad-CAM heatmaps.
  - **Adversarial Examples & Adversarial Noise for MNIST:** Optimizing input pixels (`x.requires_grad = True`) to generate Fast Gradient Sign Method (FGSM) and PGD adversarial attacks.
  - **Deep Dream:** Gradient ascent on intermediate convolutional layer activations to amplify learned visual motifs.
  - **Style Transfer:** Decoupling content activations from Gram-matrix style correlations using a frozen VGG backbone and `L-BFGS`.
- **Classical Sequence & Time-Series Modeling**
  - **RNNs & LSTMs:** Recurrent hidden states, vanishing/exploding gradients in Backpropagation Through Time (BPTT), gradient clipping, and LSTM gating (forget, input, output gates).
  - **Time Series Prediction:** Sliding-window autoregression over continuous temporal data.
  - **Classical NLP, Machine Translation & Image Captioning:** Count-based text representations (bag of words, n-grams, TF-IDF), Word2Vec/GloVe embeddings, Seq2Seq encoder-decoders, and CNN-to-RNN captioning (demonstrating the fixed-vector information bottleneck that motivated Attention).

### Canonical Resources

- **Repositories:**
  - [`huggingface/pytorch-image-models`](https://github.com/huggingface/pytorch-image-models) (`timm`) — SOTA computer vision models, layers, and pretrained weights.
  - [`pytorch/captum`](https://github.com/pytorch/captum) — Model interpretability and feature attribution for PyTorch.
  - [`Harry24k/adversarial-attacks-pytorch`](https://github.com/Harry24k/adversarial-attacks-pytorch) — PyTorch implementation of adversarial attacks (FGSM, PGD, CW).
- **Lectures & Guides:**
  - Stanford CS231n: _Deep Learning for Computer Vision_ (`cs231n.stanford.edu`).
  - Chris Olah: _Feature Visualization_ (`distill.pub/2017/feature-visualization`).

---

## Phase 5: The Transformer Architecture

_Objective: Master self-attention internals, forward-pass mechanics, and encoder vs. decoder architectural paradigms._

### Core Modules

- **Attention & Transformer Internals `[INTERVIEW-CORE]`**
  - **Attention Mechanism Explained:** Overcoming the Seq2Seq bottleneck; geometric intuition of **Query ($Q$), Key ($K$), and Value ($V$)** projections.
  - **Self-Attention from Scratch:** Implementing $\text{Softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$ and proving mathematically why scaling by $\frac{1}{\sqrt{d_k}}$ prevents dot products from growing large and pushing Softmax into regions with vanishingly small gradients.
  - **Cross-Attention vs. Self-Attention:** How encoder-decoder models route queries from the decoder and keys/values from the encoder.
  - **Causal Masking:** Applying upper-triangular $-\infty$ masks to prevent look-ahead information leakage during autoregressive training.
  - **Multi-Head Attention (MHA):** Why attending to multiple representation subspaces simultaneously outperforms single-head attention.
  - **Feed-Forward Networks (FFNs) & Skip Connections:** Role of position-wise MLP blocks as key-value memories and how **Residual (Skip) Connections** create uninterrupted gradient highways.
  - **Positional Encodings:** Why permutation-invariant attention requires positional signals (Sinusoidal vs. Learned vs. RoPE).
- **Canonical Architectures & Forward Pass Walkthrough**
  - **Encoder-Only (BERT) vs. Decoder-Only (GPT) vs. Encoder-Decoder (T5) `[INTERVIEW-CORE]`:** Masked Language Modeling (bidirectional) vs. Causal Language Modeling (autoregressive), and why decoder-only models dominate production LLM scaling.
  - **Step-by-Step Decoder Forward Pass `[INTERVIEW-CORE]`:** Walking through token IDs $\rightarrow$ Embedding lookup + Positional Encoding $\rightarrow$ $N \times$ [Pre-RMSNorm $\rightarrow$ Causal MHA $\rightarrow$ Residual $\rightarrow$ Pre-RMSNorm $\rightarrow$ FFN $\rightarrow$ Residual] $\rightarrow$ Final Norm $\rightarrow$ LM Head Linear Projection $\rightarrow$ Logits.
  - **GPT from Scratch:** Coding a complete character/BPE-level autoregressive Transformer in PyTorch.

### Canonical Resources

- **Repositories:**
  - [`karpathy/nanoGPT`](https://github.com/karpathy/nanoGPT) — Simplest, fastest repository for training/finetuning medium-sized GPTs.
  - [`harvardnlp/annotated-transformer`](https://github.com/harvardnlp/annotated-transformer) — Line-by-line PyTorch guide to _Attention Is All You Need_.
  - [`amitshekhariitbhu/ai-engineering-interview-questions`](https://github.com/amitshekhariitbhu/ai-engineering-interview-questions) — _LLM Fundamentals & Transformer Architecture_ section.
- **Lectures & Guides:**
  - Paper: _Attention Is All You Need_ (Vaswani et al., arXiv:1706.03762).
  - Andrej Karpathy: _Let's build GPT: from scratch, in code, spelled out_ (YouTube).
  - Outcome School Blog Series (`outcomeschool.com/blog`):
    - _Decoding Transformer Architecture_ & _Math behind Attention - Q, K, and V_.
    - _Math behind $\sqrt{d_k}$ Scaling Factor in Attention_ & _Causal Masking in Attention_.
    - _Cross Attention vs. Self Attention_ & _Skip Connections in Transformers_.
    - _Feed-Forward Networks in LLMs_ & _Encoder vs. Decoder in Transformers_.

---

## Phase 6: Frontier LLMs from Scratch (Llama 4, DeepSeek-V3, Qwen 3)

_Objective: Bridge from vanilla Transformers to 2025/2026 frontier architectures, tokenization mechanics, and decoding strategies._

### Core Modules

- **LLM Fundamentals: Tokenization, Embeddings & Decoding `[INTERVIEW-CORE]`**
  - **Foundation Models & Generative AI:** How pre-trained foundation models shifted AI engineering from task-specific training to adaptation; **Open-Weights vs. Closed-Source LLMs** (cost, privacy, latency, and control trade-offs).
  - **Inside ChatGPT (End-to-End Request Lifecycle):** What happens step-by-step from hitting Enter to streaming tokens back to the client.
  - **Tokenization Deep Dive:** **BPE (Byte-Pair Encoding)**, **WordPiece**, and **SentencePiece**; why rare/domain words fragment into excessive tokens (inflating cost and degrading reasoning).
  - **Context Window Mechanics:** Why context windows are bounded (quadratic attention compute $\mathcal{O}(N^2)$ and linear KV-cache VRAM growth) and RoPE long-context scaling.
  - **Decoding Strategies & Failure Modes:** Comparing **Greedy Decoding**, **Beam Search**, **Temperature Scaling**, **Top-$k$**, and **Top-$p$ (Nucleus) Sampling**—and knowing exactly when each fails (e.g., repetitive loops in greedy/beam search vs. incoherence at high temperature).
  - **Stopping Mechanics:** Difference between a **Stop Token** (single special vocabulary ID like `<|eot_id|>`) and a **Stop Sequence** (multi-token string matched during generation).
- **Modern Attention & Architectural Variations `[INTERVIEW-CORE]`**
  - **Attention Bottlenecks & Variants:** Multi-Query Attention (MQA) and **GQA (Grouped-Query Attention)** for shrinking KV-cache memory bandwidth.
  - **MLA (Multi-Head Latent Attention):** Low-rank joint key-value compression used in DeepSeek-V3/R1 to drastically cut KV cache footprint.
  - **Mixture of Experts (MoE):** Sparse expert routing, top-$k$ gating networks, shared vs. routed experts, and load balancing in models like Mixtral, DeepSeek-V3, and Llama 4.
- **Frontier Implementations from Scratch**
  - **LLM System Design:** Chinchilla scaling laws, parameter-to-token ratios, and distributed parallelism (Data, Tensor, Pipeline, Sequence, and Expert Parallelism).
  - **Llama 4 from Scratch:** Coding modern GQA, SwiGLU, RoPE, RMSNorm, and MoE blocks.
  - **DeepSeek-V3 from Scratch:** Coding Multi-head Latent Attention (MLA), auxiliary-loss-free DeepSeekMoE, and Multi-Token Prediction (MTP).
  - **Qwen 3 from Scratch:** Coding QK-Norm, hybrid thinking/non-thinking modes, and dense/MoE blocks.
  - **Self-Study LLM:** Dissecting Hugging Face `modeling_*.py` files and reproducing architectural ablations.

### Canonical Resources

- **Repositories:**
  - [`rasbt/LLMs-from-scratch`](https://github.com/rasbt/LLMs-from-scratch) — Implementing a ChatGPT-like LLM in PyTorch from scratch, step by step, plus Llama/Qwen/DeepSeek bonus implementations.
  - [`karpathy/minbpe`](https://github.com/karpathy/minbpe) — Clean, minimal code for the Byte-Pair Encoding (BPE) algorithm used in LLM tokenizers.
  - [`deepseek-ai/DeepSeek-V3`](https://github.com/deepseek-ai/DeepSeek-V3) — Official DeepSeek-V3 implementation.
- **Lectures & Guides:**
  - Andrej Karpathy: _Let's build the GPT Tokenizer_ (YouTube).
  - Outcome School Blog Series (`outcomeschool.com/blog`):
    - _Inside ChatGPT: What Happens After You Hit Enter_ & _Tokenization in LLMs / Byte Pair Encoding_.
    - _How does Temperature control LLM output?_ & _How do Top-k and Top-p Sampling work?_.
    - _Stop Tokens in LLMs_ & _Mixture of Experts (MoE) Explained_.

---

## Phase 7: Post-Training, Fine-Tuning & Model Distillation

_Objective: Adapt base models via parameter-efficient fine-tuning (PEFT) or compress capabilities via Knowledge Distillation._

### Core Modules

- **Strategic Decision Framework `[INTERVIEW-CORE]`**
  - **Why Fine-Tune (Fine-Tuning vs. RAG vs. Prompting):** Using Prompting/RAG for dynamic external facts vs. Fine-Tuning for behavioral alignment, strict formatting, latency reduction, or domain-specific style; mitigating **Catastrophic Forgetting**.
  - **Hugging Face End-to-End Ecosystem:** Mastering `transformers`, `datasets`, `accelerate`, `peft`, `trl`, and `unsloth`.
  - **Data Preparation:** Curating high-signal instruction pairs, ChatML templates, multi-turn formatting, synthetic data distillation, and decontamination.
- **Parameter-Efficient Fine-Tuning (PEFT) `[INTERVIEW-CORE]`**
  - **LoRA (Low-Rank Adaptation):** Freezing base weights $W_0$ and injecting trainable rank-decomposition matrices $\Delta W = BA$; choosing rank ($r$), scaling ($\alpha$), and target modules.
  - **QLoRA:** 4-bit NormalFloat (`NF4`), Double Quantization, and Paged Optimizers for fine-tuning on single GPUs.
  - **DoRA (Weight-Decomposed Low-Rank Adaptation):** Decomposing pre-trained weights into magnitude and directional components for closer-to-full-finetuning recovery.
  - **Prefix Tuning vs. Prompt Tuning `[INTERVIEW-CORE]`:** Adding learnable virtual tokens to _every transformer layer's_ Key/Value states (Prefix Tuning) vs. adding virtual tokens _only at the input embedding layer_ (Prompt Tuning)—and calculating exact trainable parameter counts.
- **Knowledge Distillation `[INTERVIEW-CORE]`**
  - **Teacher-Student Distillation:** Transferring capabilities from a massive teacher LLM to a compact student model.
  - **Dark Knowledge & Soft Labels:** Raising temperature ($T > 1$) during training so the student learns inter-token probability relationships via **Distillation Loss (KL Divergence)** combined with hard-label Cross-Entropy Loss.
- **Execution, Training & Deployment**
  - **Training and Hyperparameters:** Learning rate schedules, gradient accumulation, sequence packing, mixed precision (`bf16`), and FlashAttention-2.
  - **Fine-Tuning a Model for a Real Use Case:** End-to-end capstone (e.g., medical scribe, SQL generator, or low-latency classifier).
  - **Evaluation & Deployment:** Merging LoRA adapters into base weights, regression testing, and exporting to production serving engines.

### Canonical Resources

- **Repositories:**
  - [`huggingface/peft`](https://github.com/huggingface/peft) & [`huggingface/alignment-handbook`](https://github.com/huggingface/alignment-handbook) — Official scripts and recipes for SFT, LoRA, QLoRA, and DPO.
  - [`unslothai/unsloth`](https://github.com/unslothai/unsloth) — 2x faster, 70% less memory fine-tuning for Llama, Qwen, and DeepSeek.
- **Lectures & Guides:**
  - Outcome School Blog Series (`outcomeschool.com/blog`):
    - _How does Fine-Tuning work?_ & _How does Prefix Tuning work? (Prefix vs. Prompt Tuning math)_.
    - _How does Knowledge Distillation work?_.
  - Papers: _LoRA_ (Hu et al., arXiv:2106.09685), _QLoRA_ (Dettmers et al., arXiv:2305.14314), _DoRA_ (Liu et al., arXiv:2402.09353).

---

## Phase 8: Reinforcement Learning & Reasoning Alignment

_Objective: Train policies via environmental feedback and align LLMs for preference optimization and multi-step reasoning._

### Core Modules

- **Classical & Deep Reinforcement Learning**
  - **Agents and Environments:** Markov Decision Processes (MDPs), states, actions, rewards, policies ($\pi$), and discount factors ($\gamma$).
  - **Deep Q-Learning (DQN):** Bellman equations, experience replay buffers, and target network stabilization.
  - **Policy Gradients:** Deriving REINFORCE and baseline variance reduction.
- **RLHF, DPO & Reasoning Alignment `[INTERVIEW-CORE]`**
  - **PPO, Importance Ratio & Advantage:** Proximal Policy Optimization, Generalized Advantage Estimation (GAE), clipped surrogate objectives, and KL-divergence reference penalties.
  - **RL Fine-Tuning (RLHF vs. DPO):** Training Bradley-Terry reward models vs. **Direct Preference Optimization (DPO)** (closed-form policy optimization directly on chosen/rejected pairs).
  - **LLM Reasoning & GRPO:** **Group Relative Policy Optimization** (eliminating the critic model by normalizing rewards across sampled group outputs) and **Reinforcement Learning with Verifiable Rewards (RLVR)** to induce self-verification and test-time compute scaling.

### Canonical Resources

- **Repositories:**
  - [`vwxyzjn/cleanrl`](https://github.com/vwxyzjn/cleanrl) — Single-file, readable PyTorch implementations of DQN, PPO, and RL algorithms.
  - [`volcengine/verl`](https://github.com/volcengine/verl) & [`OpenRLHF/OpenRLHF`](https://github.com/OpenRLHF/OpenRLHF) — Production RLHF, PPO, DPO, and GRPO training frameworks for LLMs.
- **Lectures & Guides:**
  - OpenAI: _Spinning Up in Deep RL_ (`spinningup.openai.com`).
  - Paper: _DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning_ (arXiv:2501.12948).
  - Hugging Face: _The Ultra-Scale Playbook & TRL Documentation_.

---

## Phase 9: Context Engineering, Vector Databases & Advanced RAG

_Objective: Master the #1 most heavily tested AI Engineering interview domain—designing, scaling, and debugging production RAG and Context pipelines._

### Core Modules

- **Prompting, Context Engineering & Compaction `[INTERVIEW-CORE]`**
  - **Prompt Engineering vs. Context Engineering:** Tuning the "inner box" (wording, few-shot examples, Chain-of-Thought, JSON schema enforcement) vs. architecting the "outer box" (the complete runtime context window: system instructions, retrieved chunks, tool definitions, memory, conversation history, and user query).
  - **Prompt Chaining:** Breaking monolithic prompts into sequential modular steps and preventing cascading error propagation.
  - **Context Budgeting & Compaction:** Ordering context from _most stable_ (System Prompt, Tools) to _most fresh_ (History, Query) to maximize **Prompt Caching** hits; combating the **"Lost in the Middle" Problem** (placing critical instructions at the very beginning and very end); recursive summarization and token pruning.
  - **RAG vs. Long Context Windows:** When to use retrieval vs. stuffing a 1M-token context window (cost per query, TTFT latency, and needle-in-a-haystack degradation).
- **Chunking, Embeddings & Vector Databases `[INTERVIEW-CORE]`**
  - **Chunking Strategies:** Comparing **Fixed-Size**, **Recursive Character**, **Semantic Chunking**, and **Parent-Child Chunking** (retrieving small granular child chunks for precision, but passing the broader parent chunk to the LLM for complete context).
  - **Contextual Retrieval:** Prepending a concise, LLM-generated chunk-specific explanatory header to each chunk _before_ embedding and BM25 indexing so isolated chunks never lose document-level context.
  - **Vector DB & ANN Search:** How vector databases index embeddings using **Approximate Nearest Neighbor (ANN)** algorithms (**HNSW** graphs, **IVF** clustering, Product Quantization) and apply pre/post **Metadata Filtering**.
- **Hybrid Search, Reranking & Query Transformation `[INTERVIEW-CORE]`**
  - **Hybrid Search:** Combining dense semantic vector search with sparse lexical search (**BM25** for exact keyword/jargon matches) via Reciprocal Rank Fusion (RRF).
  - **Reranking Architectures:** Why initial retrieval optimizes for recall while reranking optimizes for precision; comparing **Cross-Encoders**, **LLM-based Rerankers**, and **ColBERT (Late Interaction via $\text{MaxSim}$)**—where queries and documents are encoded into per-token matrices and scored via sum of maximum cosine similarities:
    $$S(q, d) = \sum_{i \in \vert{}q\vert{}} \max_{j \in \vert{}d\vert{}} \left( E_{q_i} \cdot E_{d_j}^T \right)$$
  - **Query Transformation:** **HyDE (Hypothetical Document Embeddings)**, **Query Decomposition** (breaking complex multi-part questions into sub-queries), **Step-Back Prompting**, and **Multi-Query Retrieval**.
- **Advanced RAG Paradigms `[INTERVIEW-CORE]`**
  - **Self-RAG & Agentic RAG:** Equipping an agent to dynamically decide _whether_ to retrieve, _which_ data source to query, evaluate retrieved relevance, and iteratively rewrite queries across multi-hop steps.
  - **GraphRAG:** Combining Knowledge Graphs (entities + relations + hierarchical community summaries) with vector search to answer multi-hop relational and global dataset questions (**Local Search vs. Global Search**), plus indexing cost trade-offs.
  - **Vectorless RAG & Structured Data:** Routing natural language queries over SQL databases (Text-to-SQL), Markdown tables, and complex multi-column PDFs.
- **Production RAG Debugging & Failure Modes `[INTERVIEW-CORE]`**
  - _Scenario 1 — Hallucinating despite correct context:_ Enforcing strict grounding prompts, lowering temperature, structured citation extraction, and context pruning.
  - _Scenario 2 — Redundant/Duplicate chunks:_ Tuning chunk overlap, Maximal Marginal Relevance (MMR), and semantic deduplication.
  - _Scenario 3 — Slow retrieval at million-document scale:_ Sharding, HNSW parameter tuning (`efSearch`, `M`), scalar/binary embedding quantization, and semantic caching.
  - _Scenario 4 — Per-User Access Control (RBAC):_ Enforcing document-level security permissions inside metadata filters _prior_ to vector retrieval so unauthorized chunks never enter the LLM context.
  - _Scenario 5 — Document updates & freshness:_ Incremental indexing by document hash, TTL invalidation, and citation/source attribution.

### Canonical Resources

- **Repositories:**
  - [`amitshekhariitbhu/ai-engineering-interview-questions`](https://github.com/amitshekhariitbhu/ai-engineering-interview-questions) — _Retrieval-Augmented Generation (RAG) & Context Engineering_ sections.
  - [`run-llama/llama_index`](https://github.com/run-llama/llama_index) — Data framework for LLM applications and advanced RAG patterns.
  - [`stanford-futuredata/ColBERT`](https://github.com/stanford-futuredata/ColBERT) — Fast and accurate neural retrieval via late interaction.
  - [`microsoft/graphrag`](https://github.com/microsoft/graphrag) — Modular graph-based RAG system.
- **Lectures & Guides:**
  - Outcome School Blog Series (`outcomeschool.com/blog`):
    - _What is Context Engineering?_ & _How does Prompt Chaining work?_.
    - _Chunking Strategies for RAG_, _How does Contextual Retrieval work?_, & _The Lost in the Middle Problem in LLMs_.
    - _How does Hybrid Search work?_, _How does a Reranker work?_, & _Decoding ColBERT - Late Interaction Retrieval_.
    - _How does HyDE work in RAG?_ & _How do Query Rewriting and Multi-Query Retrieval work?_.
    - _Agentic RAG_, _What is GraphRAG?_, _Vectorless RAG_, & _How does Approximate Nearest Neighbor (ANN) search work?_.

---

## Phase 10: High-Performance Inference, Quantization, CUDA & Serving

_Objective: Optimize GPU hardware execution, compress model weights, and serve LLMs with minimal Time-To-First-Token (TTFT) and maximum throughput._

### Core Modules

- **Hardware Acceleration & CUDA Kernels**
  - **CUDA Fundamentals:** GPU execution hierarchy (Threads $\rightarrow$ Warps $\rightarrow$ Thread Blocks $\rightarrow$ Streaming Multiprocessors), HBM vs. on-chip SRAM, memory bandwidth bottlenecks, and kernel fusion.
  - **Custom Kernels &LPUs:** Writing GPU kernels in CUDA / OpenAI Triton, and understanding specialized inference silicon like **LPUs (Language Processing Units)** designed for deterministic SRAM token streaming.
- **Model Quantization Deep Dive `[INTERVIEW-CORE]`**
  - **Quantization Math:** Mapping continuous floating-point ranges to discrete integers (`INT8`, `INT4`) using **Scale** and **Zero-Point**:
    $$q = \text{round}\left(\frac{r}{\text{scale}}\right) + \text{zero\_point}$$
  - **Granularity & Schemes:** **Per-Tensor vs. Per-Channel Quantization** (preserving accuracy against outlier weights); **Weight-Only Quantization** ($W4A16$) vs. **Weight-and-Activation Quantization** ($W8A8$).
  - **PTQ vs. QAT:** **Post-Training Quantization** (GPTQ, AWQ—protecting salient activation channels, bitsandbytes) vs. **Quantization-Aware Training** (simulating rounding noise during training).
  - **Local Inference & Edge Formats:** How **Ollama**, `llama.cpp`, **GGML**, and **GGUF** quantize and execute models across GPU/CPU/Apple Silicon unified memory.
- **KV Cache & Latency Mechanics `[INTERVIEW-CORE]`**
  - **The First-Token Latency Problem (Prefill vs. Decode):** Why generating the first token (compute-bound parallel prefill over the entire prompt) is much slower than subsequent tokens (memory-bandwidth-bound sequential decode).
  - **KV Cache Estimation & Compression:** Calculating exact KV Cache VRAM usage:
    $$\text{KV Size} = 2 \times \text{Layers} \times \text{KV\_Heads} \times \text{Head\_Dim} \times \text{Precision\_Bytes} \times \text{Seq\_Len} \times \text{Batch\_Size}$$
    Plus KV cache quantization (`FP8`/`INT4`), token eviction, and GQA/MLA reductions.
- **Speculative Decoding & Production Serving Engines `[INTERVIEW-CORE]`**
  - **Speculative Decoding Variants:** Draft-and-verify decoding, **N-gram Speculation** (copying repeating n-grams from context), **Medusa** (attaching multiple decoding heads to predict future tokens verified in parallel via tree attention), and **EAGLE** (autoregressive drafting at the feature level rather than token level).
  - **Continuous Batching & Prompt Caching:** Iteration-level request scheduling (eliminating padding waste) and reusing computed KV states for shared prompt prefixes.
  - **Prefill-Decode Disaggregation:** Separating compute-heavy prefill nodes from bandwidth-heavy decode nodes in production clusters.
  - **Serving Engines Compared:**
    - **vLLM:** **PagedAttention** (storing KV cache in non-contiguous virtual memory blocks to eliminate fragmentation).
    - **SGLang:** **RadixAttention** (maintaining a radix tree of KV caches across requests for automatic multi-turn and agentic prefix reuse) and fast constrained structured output decoding.
    - **TensorRT-LLM:** NVIDIA's C++/CUDA graph compilation and kernel-fused inference engine.

### Canonical Resources

- **Repositories:**
  - [`vllm-project/vllm`](https://github.com/vllm-project/vllm) — High-throughput and memory-efficient LLM serving engine.
  - [`sgl-project/sglang`](https://github.com/sgl-project/sglang) — Fast serving framework for LLMs and VLMs using RadixAttention.
  - [`ollama/ollama`](https://github.com/ollama/ollama) & [`ggerganov/llama.cpp`](https://github.com/ggerganov/llama.cpp) — Local LLM inference in C/C++.
  - [`srush/GPU-Puzzles`](https://github.com/srush/GPU-Puzzles) — Interactive exercises to learn CUDA programming.
- **Lectures & Guides:**
  - Outcome School Blog Series (`outcomeschool.com/blog`):
    - _How does Model Quantization work?_ & _How does Ollama work?_.
    - _What is KV Cache in LLMs?_, _KV Cache Compression_, & _The First-Token Latency Problem in LLMs_.
    - _Continuous Batching in LLMs_, _Prompt Caching_, & _Prefill-Decode Disaggregation_.
    - _Medusa_, _EAGLE_, & _N-gram Speculation in LLMs_.
    - _How vLLM works_, _How SGLang works (RadixAttention)_, _How TensorRT-LLM works_, _How CUDA Kernels work_, & _How an LPU works_.

---

## Phase 11: Autonomous Agents, MCP, Evaluation & Guardrails

_Objective: Architect reliable tool-using agents, standardize context connectors with MCP, and implement rigorous automated evaluation._

### Core Modules

- **Agents from First Principles `[INTERVIEW-CORE]`**
  - **The 5 Core Components of an AI Agent:**
    1. **The Brain (LLM):** Reasoning engine that recommends actions or returns final answers.
    2. **The Instructions (System Prompt):** Role, constraints, and **Agent Skills** (modular folders where only a 1-line skill description stays in context, loading full step-by-step procedures on demand).
    3. **The Hands (Tools):** External actions defined by `name`, `description` (the critical routing signal read by the LLM), and strict JSON `input_schema`.
    4. **The Memory:** **Short-term memory** (in-flight session trajectory/observations) vs. **Long-term memory** (episodic, semantic, and procedural facts persisted in external vector/relational stores).
    5. **The Loop (Runtime & Loop Engineering):** The controller loop (`Think -> Act -> Observe -> Repeat`), step budgets, stopping conditions, and **fixing infinite agent loops** (`max_iterations`, stuck-action detectors, explicit `FINISH` tool calls).
  - **Reasoning Patterns:** ReAct (Reason + Act), Plan-and-Execute, and Reflexion (self-critique).
- **Model Context Protocol (MCP) & Tooling `[INTERVIEW-CORE]`**
  - **Function Calling vs. MCP:** Why Function Calling is how the _model asks_ to invoke a tool, while **MCP (the "USB-C port for AI")** is the open protocol for how _host applications discover and connect_ to tools and data sources.
  - **The MCP Triad Architecture:** **Host** (AI app like Claude Desktop/Cursor), **Client** (1-to-1 protocol connector inside the host), and **Server** (lightweight process exposing Tools, Resources, and Prompts).
- **Agent Frameworks, Patterns & Security `[INTERVIEW-CORE]`**
  - **LangChain vs. LangGraph:** Composable pipe chains (`Prompt | LLM | Parser`) vs. cyclical stateful graphs (`LangGraph`) with persistence, checkpointing, and human-in-the-loop approvals.
  - **Multi-Agent Topologies:** Supervisor/Orchestrator-Worker patterns, handoffs, parallel sub-agents, and deterministic routing.
  - **Agent Security & Reliability:** Defending against direct and indirect **Prompt Injection** (malicious instructions hidden inside retrieved web pages or emails), least-privilege tool scoping, human confirmation gates for destructive actions, and sandboxed code execution.
- **Evals, Tracing & Guardrails `[INTERVIEW-CORE]`**
  - **The 4 Evaluation Pillars:**
    1. **Automatic Reference Metrics:** `BLEU`, `ROUGE`, `BERTScore`, `Perplexity`, and `Exact Match`.
    2. **Standard Benchmarks:** MMLU, GSM8K, HumanEval, SWE-bench.
    3. **Human Evaluation:** Likert scale ratings, Pairwise comparisons (Chatbot Arena / Elo), and granular Error Annotation.
    4. **LLM-as-a-Judge:** Rubric-based grading and mitigating judge failure modes (**Position Bias** via swap-order evaluation, **Verbosity Bias** via length normalization, and **Self-Preference Bias**).
  - **RAG & Agent Specific Evaluation:** The RAG Triad (**Context Precision, Context Recall, Faithfulness/Groundedness, Answer Relevance**) using `RAGAS`/`DeepEval`; evaluating Agent **Tool Selection Accuracy**, argument validity, step efficiency, and task completion.
  - **Observability & Guardrails:** Distributed trace instrumentation (LangSmith, Langfuse, Arize Phoenix) and input/output runtime guardrails (PII redaction, toxicity filtering, hallucination grounding checks).

### Canonical Resources

- **Repositories:**
  - [`amitshekhariitbhu/ai-engineering-interview-questions`](https://github.com/amitshekhariitbhu/ai-engineering-interview-questions) & [`amitshekhariitbhu/ai-engineering-course`](https://github.com/amitshekhariitbhu/ai-engineering-course) — Complete 18-module AI Engineering learning path and interview bank.
  - [`langchain-ai/langgraph`](https://github.com/langchain-ai/langgraph) — Building resilient language agents as graphs.
  - [`modelcontextprotocol/specification`](https://github.com/modelcontextprotocol/specification) — Official MCP standard and reference servers.
  - [`explodinggradients/ragas`](https://github.com/explodinggradients/ragas) & [`confident-ai/deepeval`](https://github.com/confident-ai/deepeval) — LLM & RAG evaluation frameworks.
- **Lectures & Guides:**
  - Outcome School Blog Series (`outcomeschool.com/blog`):
    - _What is an AI Agent? How It Works_, _What are Agent Skills?_, & _AI Agent Memory_.
    - _What is MCP (Model Context Protocol)?_ & _How does LangChain work?_.
    - _What is LLM Evaluation? Metrics, Benchmarks, and Methods_ & _AI Agent Evaluation_.
  - Anthropic Engineering: _Building Effective Agents_ (`anthropic.com/research/building-effective-agents`).

---

## Phase 12: MLOps, LLMOps & AI System Design

_Objective: Architect production pipelines, pass 60-minute AI System Design interviews, and manage cost/latency/quality trade-offs at scale._

### Core Modules

- **MLOps & LLMOps Infrastructure**
  - **Experiment & Artifact Versioning:** Dataset lineage (DVC), prompt versioning, experiment tracking (Weights & Biases, MLflow), and Model Registries.
  - **Containerization & GPU Orchestration:** Multi-stage CUDA Docker images, Kubernetes GPU scheduling, and serverless cold-start optimization.
  - **CI/CD for AI Systems:** Running automated golden-dataset evaluation suites on every pull request, shadow deployments, canary rollouts, and A/B testing models/prompts in production.
  - **Production Telemetry & Cost Control:** Monitoring TTFT, ITL (Inter-Token Latency), token spend per user, semantic caching hit rates, GPU saturation, and data/concept drift.
- **AI System Design Framework `[INTERVIEW-CORE]`**
  - **The 5-Stage Pipeline Stress-Test:** Framing every system design problem around **Input $\rightarrow$ Retrieval $\rightarrow$ Generation $\rightarrow$ Verification $\rightarrow$ Feedback**, explicitly stating how each stage fails and how to mitigate it.
  - **The Quality–Latency–Cost Triangle:** Navigating architectural trade-offs (e.g., routing simple queries to a quantized 8B model while escalating complex queries to a frontier reasoning model; using semantic caching and prompt caching to cut API spend by 70%).
  - **End-to-End System Design Case Studies:** Enterprise Multi-Tenant RAG with RBAC, Real-Time Multimodal Content Moderation Pipeline, Autonomous Coding Agent Sandbox, and High-Throughput Customer Support Copilot.

### Canonical Resources

- **Repositories:**
  - [`GokuMohandas/Made-With-ML`](https://github.com/GokuMohandas/Made-With-ML) — End-to-end MLOps from design to production deployment.
  - [`langfuse/langfuse`](https://github.com/langfuse/langfuse) — Open-source LLM engineering platform (traces, evals, prompt management, metrics).
- **Lectures & Guides:**
  - Outcome School Video Masterclass: _AI Engineering Explained: LLM, RAG, MCP, Agent, Fine-Tuning, Quantization_ (YouTube).
  - Chip Huyen: _AI Engineering: Building Applications with Foundation Models_ & _Designing Machine Learning Systems_ (O'Reilly).
