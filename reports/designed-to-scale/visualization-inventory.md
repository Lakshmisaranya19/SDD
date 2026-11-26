# Visualization Inventory

**Status:** Evidence-based patterns with reusable proposals

The reference uses inline SVG for each lesson stage and a common stage-control shell. Complete lesson-by-lesson SVG extraction is not present in the evidence, so the inventory below lists confirmed and strongly representative patterns rather than asserting every pattern's formal data model.

## Common visualization shell

Every observed stage has:
- an inline SVG stage
- Fit, Replay and Pause/Play controls
- fullscreen control
- timeline integration
- step-specific metric chips
- a guide panel that explains the visual state

Reusable renderer requirements:
- a responsive SVG viewport
- viewBox or fit transform
- step state reducer
- replay and pause lifecycle
- fullscreen transition
- optional accessibility title/description
- reduced-motion behavior
- theme-aware tokens

## Visualization patterns

| Pattern | What it represents | Observed visual elements | Step changes | Animation/interaction | Reusable data required | Confidence |
|---|---|---|---|---|---|---|
| Request/data flow | A request moving across client, DNS, network, server and storage | Nodes, arrows, labels, latency/throughput chips | Nodes and connections activate in sequence | Animated traffic/path transitions; replay/pause | Nodes, edges, positions, labels, step activation, path tokens | High |
| Capacity/counter diagram | Utilization, server count or scaling capacity | Servers, users, counters, thresholds | Capacity, demand and error states change | Counter and state highlighting | Quantities, thresholds, node multiplicity, formatting | High |
| Load-balancer route map | One entry point distributing traffic to several servers | Entry, routing node, server fleet, health states | Routing rule and healthy server set change | Active route highlighting | Servers, route policy, weights/health, active edge state | High |
| State/ownership diagram | State stored in sticky sessions, shared store or tokens | Client, server, shared store, state labels | Ownership moves or server failure occurs | Node movement and failover highlighting | State owners, data records, ownership/health transitions | Medium |
| Cache flow | Hits, misses and stale/invalidation behavior | App, cache, database, read/write arrows | Cache population, hit/miss, stale/invalidation states | Pulse/hold/active-edge effects | Node roles, cache key, hit/miss state, TTL/invalidation state | High |
| Sharding/partition map | Data distribution across ranges or nodes | Ranges, keys, shards, hot-key indicators | Keys move or shard nodes are added | Partition highlighting and node changes | Key space, range/hash function, ownership, shard capacity | Medium |
| Ring/consistent-hash map | Hash ring and virtual-node assignment | Ring, server positions, keys, virtual nodes | Server/key placement changes | Ring movement and ownership reassignment | Ring positions, tokens, key positions, replica mapping | Medium |
| Replication topology | Primary/replica copies and read/write routing | Leader, replicas, write/read paths, lag indicators | Replica health and routing change | Edge activation, lag and failover effects | Topology, primary/replica roles, lag, routing state | Medium |
| Consensus/election timeline | Leader election and quorum behavior | Nodes, messages, majority, term/commit markers | Candidates, votes, commit and heal states | Sequence and state transitions | Node states, message edges, quorum, term/commit state | Medium |
| Queue/message flow | Producers, broker, consumers and deliveries | Queues, producers, consumers, message packets | Backlog, retries, consumers change | Packet movement and queue depth | Queue depth, consumers, delivery state, retry/ACK state | Medium |
| Event/pub-sub fan-out | One event delivered to subscribers | Publisher, broker, fan-out connections | Subscriber set or event route changes | Fan-out animation | Topics, subscriber set, event types, delivery semantics | Medium |
| Real-time channel diagram | Long-lived connections and pushed updates | Clients, server, socket/channel, event packets | Connections and updates appear/disappear | Persistent connection and packet animation | Channels, connections, event payload indicators | Medium |
| Storage engine internals | Logs, memory tables, SSTables and compaction | Memory/disk blocks, write/read paths | Writes flush, merge or compact | Block movement and write/read highlighting | Blocks, levels, operations, flush/compaction state | Medium |
| Index/table view | Queries searching structured records | Table, index, lookup path, result rows | Index or where-clause changes | Lookup and row highlighting | Tables, index columns, query shape, result rows | Medium |
| Comparison/capacity cards | Comparing two approaches or quantities | Side-by-side cards, labels and trade-off callouts | One option becomes recommended or constrained | Card highlight | Option metadata, trade-offs, recommended state | Medium |
| Napkin-math panel | Inputs, formulas and capacity estimates | Inputs, equations, calculated chips | Values update as assumptions change | Value/metric transitions | Formula expression, inputs, units, rounding, calculated values | Medium |

## Distinct animation behaviors

Observed keyframe and state patterns include:
- `fresh-in`: new scene refresh
- `chip-flash` / `chip-in`: metric or card changes
- `held`: persistent active state
- `spot`: location or component emphasis
- `pulse`: ongoing activity
- `moved`: element movement
- `fx-burst`, `fx-fade`, `fx-pop`: graphical effects
- reading highlight synchronized with the guide

These behaviors should be data-addressable where practical: each animation should identify target elements and a state transition rather than hardcoding lesson-specific CSS scripts.

## Recommended visualization engine shape

```text
VisualizationDefinition
  rendererId
  viewport
  elements[]
  connections[]
  states[]
  stateTransitions[]
  metricBindings[]
  ariaDescription
```

Derive the Version 1 primitive set from the reference scenes and their observed behavior. Any proposed primitive list is a hypothesis, not a fixed component set; validate each primitive against representative reference scenes before making it part of the supported contract. A data-driven renderer may compose patterns from confirmed primitives. Add a specialized reusable renderer only when the reference baseline or a later approved course requirement needs a capability that the confirmed shared primitives cannot provide; do not make it course-specific.
